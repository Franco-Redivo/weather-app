import fs from 'fs';

function loadSecretEnv(varNameFile, varName) {
    const filePath = process.env[varNameFile];
    if (filePath && fs.existsSync(filePath)) {
        try {
            const val = fs.readFileSync(filePath, 'utf8').trim();
            process.env[varName] = val;
        } catch (err) {
            console.error(`Failed to read secret file for ${varName}:`, err);
        }
    }
}

// If Docker secrets are mounted, compose sets them at /run/secrets/<name>.
// Compose provides *_FILE env vars in our configuration; load them into process.env
loadSecretEnv('DATABASE_URL_FILE', 'DATABASE_URL');
loadSecretEnv('YOUTUBE_API_KEY_FILE', 'YOUTUBE_API_KEY');
loadSecretEnv('POSTGRES_PASSWORD_FILE', 'POSTGRES_PASSWORD');

const { default: app } = await import('./src/app.js');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});