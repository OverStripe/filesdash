const puppeteer = require("puppeteer");

async function extractTeraboxVideo(teraboxLink) {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(teraboxLink, { waitUntil: "networkidle2" });

        await page.waitForSelector("video", { timeout: 10000 });

        const videoURL = await page.evaluate(() => {
            const video = document.querySelector("video");
            return video ? video.src : null;
        });

        await browser.close();
        return videoURL || "No video found!";
    } catch (error) {
        console.error("Error extracting video:", error);
        return "Failed to extract video.";
    }
}

module.exports = { extractTeraboxVideo };

