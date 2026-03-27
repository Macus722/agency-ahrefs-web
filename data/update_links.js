const fs = require('fs');
const filePath = 'c:/Users/desmo/Herd/landing_page/data/agencies_data.js';
let content = fs.readFileSync(filePath, 'utf-8');

// Strip out constant variable declaration to parse raw JSON
let jsonStr = content.replace('const agencyData = ', '').replace(/;$/, '').trim();
let data = JSON.parse(jsonStr);

// Inject unique website entries and social urls where applicable
data.forEach(agency => {
    let rawStr = Math.random().toString(36).substring(7);
    let domain = agency.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Some static overrides for realism
    if (agency.id === 'brandthirty') domain = 'brandthirty';
    if (agency.id === 'alphafin-media') domain = 'alphafinmedia';
    if (agency.id === 'onely') domain = 'onely';
    if (agency.id === 'np-digital') domain = 'npdigital';
    if (agency.id === 'screaming-frog') domain = 'screamingfrog.co.uk';
    if (agency.id === 'brainlabs') domain = 'brainlabsdigital';
    if (agency.id === 'reboot-online') domain = 'rebootonline';
    if (agency.id === 'victorious') domain = 'victorious';

    // Build the website link
    if (agency.id === 'screaming-frog') {
        agency.website = `https://www.${domain}`;
    } else {
        agency.website = `https://www.${domain}.com`;
    }

    // Assign realistic social paths
    agency.socials = {
        linkedin: `https://www.linkedin.com/company/${domain}`,
        twitter: `https://twitter.com/${domain}_agency`
    }
});

let output = 'const agencyData = ' + JSON.stringify(data, null, 2) + ';';
fs.writeFileSync(filePath, output, 'utf-8');
console.log('Successfully added website and social links to agencies database!');
