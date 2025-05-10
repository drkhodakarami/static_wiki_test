document.addEventListener('DOMContentLoaded', function() {
    // Initialize YouTube video players
    initYouTubePlayers();
});

// Function to initialize YouTube video players
function initYouTubePlayers() {
    document.querySelectorAll('.video-container').forEach(container => {
        const playButton = container.querySelector('.play-button');
        const videoId = container.getAttribute('data-video-id');
        const playerContainer = container.querySelector('.video-player');
        
        if (playButton && videoId && playerContainer) {
            playButton.addEventListener('click', function() {
                // Create YouTube player
                createYouTubePlayer(videoId, playerContainer);
                
                // Hide thumbnail and play button
                container.querySelector('img').style.display = 'none';
                playButton.style.display = 'none';
                
                // Show player
                playerContainer.classList.add('active');
            });
        }
    });
}

// Function to create a YouTube player
function createYouTubePlayer(videoId, container) {
    // Create a div for the player
    const playerDiv = document.createElement('div');
    playerDiv.id = 'youtube-player-' + videoId;
    container.appendChild(playerDiv);
    
    // Load YouTube API if not already loaded
    if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        
        // Set up callback for when API is ready
        window.onYouTubeIframeAPIReady = function() {
            window.YT = YT; // Ensure YT is globally available
            createPlayer(videoId, playerDiv.id);
        };
    } else {
        // API already loaded, create player directly
        createPlayer(videoId, playerDiv.id);
    }
}

// Function to create the actual YouTube player
function createPlayer(videoId, containerId) {
    new YT.Player(containerId, {
        videoId: videoId,
        playerVars: {
            autoplay: 1,
            modestbranding: 1,
            rel: 0
        },
        events: {
            onReady: function(event) {
                event.target.playVideo();
            }
        }
    });
}