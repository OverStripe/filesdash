async function extractVideo() {
    const link = document.getElementById("link").value;
    const resultContainer = document.getElementById("result-container");
    const videoSource = document.getElementById("video-source");
    const videoPlayer = document.getElementById("video-player");
    const downloadLink = document.getElementById("download-link");
    const loadingMessage = document.getElementById("loading");

    if (!link) {
        alert("⚠️ Please enter a valid Terabox link.");
        return;
    }

    loadingMessage.classList.remove("hidden");
    resultContainer.classList.add("hidden");

    try {
        const response = await fetch("/extract", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ link }),
        });

        const result = await response.json();
        loadingMessage.classList.add("hidden");

        if (result.videoURL) {
            videoSource.src = result.videoURL;
            videoPlayer.load();
            resultContainer.classList.remove("hidden");

            downloadLink.href = result.videoURL;
            downloadLink.innerText = "⬇ Download Video";
        } else {
            alert("❌ Failed to extract video.");
        }
    } catch (error) {
        loadingMessage.classList.add("hidden");
        alert("🚨 Error occurred while extracting.");
    }
}

// Copy Link Function
function copyLink() {
    const videoURL = document.getElementById("video-source").src;
    navigator.clipboard.writeText(videoURL).then(() => {
        alert("📋 Link copied!");
    });
}

// Share Link Function
function shareLink() {
    const videoURL = document.getElementById("video-source").src;
    if (navigator.share) {
        navigator.share({ title: "Files Dash Video", url: videoURL });
    } else {
        alert("Sharing not supported on this device.");
    }
}

// Initialize Telegram Web App
window.Telegram.WebApp.ready();
