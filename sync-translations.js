#!/usr/bin/env node

/**
 * Sync Translations Script
 *
 * USO: node sync-translations.js
 *
 * O que faz:
 * 1. Lê locales/pt.json (arquivo MASTER em português)
 * 2. Verifica quais chaves foram adicionadas/modificadas
 * 3. Distribui para TODOS os outros idiomas (en, de, fr, es, it)
 * 4. Mantém traduções já existentes
 * 5. Adiciona novas chaves automaticamente
 *
 * IMPORTANTE: Se uma CHAVE for nova, ela usa o valor em PT em todos os idiomas
 * Depois você edita manualmente os outros idiomas se quiser traduzir
 */

const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, 'locales');
const MASTER_FILE = path.join(LOCALES_DIR, 'pt.json');
const LANGUAGES = ['en', 'de', 'fr', 'es', 'it'];

console.log('🔄 Sincronizando traduções...\n');

// Lê o master (português)
const masterTranslations = JSON.parse(fs.readFileSync(MASTER_FILE, 'utf-8'));
console.log(`✅ Master (PT) carregado: ${Object.keys(masterTranslations).length} chaves\n`);

// Para cada idioma
LANGUAGES.forEach(lang => {
    const langFile = path.join(LOCALES_DIR, `${lang}.json`);
    let langTranslations = {};

    // Se arquivo existe, lê
    if (fs.existsSync(langFile)) {
        langTranslations = JSON.parse(fs.readFileSync(langFile, 'utf-8'));
    }

    const before = Object.keys(langTranslations).length;

    // Sincroniza: se chave existe em PT mas não em LANG, adiciona com valor PT
    Object.keys(masterTranslations).forEach(key => {
        if (!langTranslations[key]) {
            // Chave nova - usa valor português como fallback
            langTranslations[key] = masterTranslations[key];
            console.log(`  ⚠️  ${lang.toUpperCase()}: Nova chave adicionada: ${key}`);
        }
    });

    // Remove chaves que não estão mais no master
    Object.keys(langTranslations).forEach(key => {
        if (!masterTranslations[key]) {
            delete langTranslations[key];
            console.log(`  🗑️  ${lang.toUpperCase()}: Chave removida: ${key}`);
        }
    });

    const after = Object.keys(langTranslations).length;

    // Salva arquivo
    fs.writeFileSync(langFile, JSON.stringify(langTranslations, null, 4) + '\n');

    const change = after - before;
    const status = change > 0 ? `➕ +${change}` : change < 0 ? `➖ ${change}` : '✅';
    console.log(`${status} ${lang.toUpperCase()}: ${after} chaves\n`);
});

console.log('✨ Sincronização completa!\n');
console.log('📝 Próximos passos:');
console.log('   1. Edite locales/pt.json com suas mudanças');
console.log('   2. Rode: node sync-translations.js');
console.log('   3. Commit & Push\n');
