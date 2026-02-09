const fs = require('fs');
const path = require('path');

const siteContentPath = path.join(__dirname, 'src/data/siteContent.json');
const tlDataPath = path.join(__dirname, 'src/data/thought_leadership_data.json');

try {
    const siteContentRaw = fs.readFileSync(siteContentPath, 'utf8');
    const siteContent = JSON.parse(siteContentRaw);

    const tlDataRaw = fs.readFileSync(tlDataPath, 'utf8');
    const tlData = JSON.parse(tlDataRaw);

    if (siteContent.content && siteContent.content.thoughtLeadership) {
        siteContent.content.thoughtLeadership.speakingEngagements = tlData.speakingEngagements;
        siteContent.content.thoughtLeadership.publications = tlData.publications;

        fs.writeFileSync(siteContentPath, JSON.stringify(siteContent, null, 4));
        console.log('Successfully merged speakingEngagements and publications into siteContent.json');
    } else {
        console.error('Error: siteContent.content.thoughtLeadership not found.');
        process.exit(1);
    }

} catch (err) {
    console.error('Error merging data:', err);
    process.exit(1);
}
