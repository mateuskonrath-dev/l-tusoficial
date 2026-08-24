#!/usr/bin/env node

/**
 * Convert all PNG/JPG images in assets/ to WebP format
 *
 * Usage: node convert-webp.js
 *
 * Requires: npm install sharp
 */

const fs = require('fs');
const path = require('path');

let sharp;
try {
    sharp = require('sharp');
} catch (e) {
    console.error('❌ sharp not found. Installing...');
    console.log('\nRun this command first:');
    console.log('  npm install sharp\n');
    process.exit(1);
}

const assetsDir = path.join(__dirname, 'assets');

// Quality settings for different image types
const qualityMap = {
    'team.png': 80,
    'qr.png': 85,
    'factory_solar.png': 80,
    'solar.png': 80,
    'hero_shoe.png': 80,
    'hero_building_clean.png': 85,
    'hero_building_new.jpg': 85,
    'lotus_building.png': 85,
    'lotus_building_sus.png': 85,
    'social-preview.png': 85,
    'logo.jpg': 90,
};

async function convertImages() {
    console.log('🎨 Starting WebP conversion...\n');

    try {
        const files = fs.readdirSync(assetsDir);
        const imageFiles = files.filter(f => /\.(png|jpg|jpeg)$/i.test(f));

        if (imageFiles.length === 0) {
            console.log('❌ No image files found in assets/');
            process.exit(1);
        }

        console.log(`Found ${imageFiles.length} images to convert:\n`);

        let successCount = 0;

        for (const file of imageFiles) {
            const inputPath = path.join(assetsDir, file);
            const outputPath = path.join(assetsDir, file.replace(/\.[^/.]+$/, '.webp'));
            const quality = qualityMap[file] || 80;

            try {
                const inputStats = fs.statSync(inputPath);
                const inputSizeKB = (inputStats.size / 1024).toFixed(1);

                await sharp(inputPath)
                    .webp({ quality })
                    .toFile(outputPath);

                const outputStats = fs.statSync(outputPath);
                const outputSizeKB = (outputStats.size / 1024).toFixed(1);
                const reduction = (100 - (outputStats.size / inputStats.size * 100)).toFixed(1);

                console.log(`✅ ${file}`);
                console.log(`   ${inputSizeKB} KB → ${outputSizeKB} KB (${reduction}% smaller)`);
                console.log(`   Quality: ${quality}%\n`);

                successCount++;
            } catch (error) {
                console.error(`❌ Error converting ${file}:`, error.message);
            }
        }

        console.log(`\n✨ Conversion complete! ${successCount}/${imageFiles.length} successful`);
        console.log('\n📝 Next steps:');
        console.log('1. Update index.html to use <picture> elements with WebP sources');
        console.log('2. Add loading="lazy" to non-hero images');
        console.log('3. Add loading="eager" + fetchpriority="high" to hero image');
        console.log('4. Optionally delete original PNG/JPG files to save space');

    } catch (error) {
        console.error('❌ Conversion failed:', error.message);
        process.exit(1);
    }
}

convertImages();
