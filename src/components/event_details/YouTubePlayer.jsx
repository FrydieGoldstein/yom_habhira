import { min } from "date-fns";
import React, { useState, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import YouTube from "react-youtube";

function YouTubePlayer({ videoId }) {
  const [playerStatus, setPlayerStatus] = useState("loading");

  const checkLiveStatus = useCallback(async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
      );
      const data = await response.json();
      const videoDetails = data.items[0];

      if (videoDetails.snippet.liveBroadcastContent === "live") {
        setPlayerStatus("live");
      } else if (videoDetails.snippet.liveBroadcastContent === "none") {
        setPlayerStatus("ended");
      } else {
        setPlayerStatus("upcoming");
      }
    } catch (error) {
      console.error("Error checking live status:", error);
      setPlayerStatus("error");
    }
  }, [videoId]);

  useEffect(() => {
    checkLiveStatus();
  }, [checkLiveStatus]);

  const handleStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      setPlayerStatus("ended");
    }
  };

  if (playerStatus === "ended") {
    return (
      <Box display="flex" justifyContent="center" padding="20px">
        השידור החי הסתיים. לצפייה בוידאו, אנא עברו ל
        <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">
          ערוץ היוטיוב שלנו
        </a>
      </Box>
    );
  }

  if (playerStatus === "error") {
    return (
      <Box display="flex" justifyContent="center" padding="20px">
        אירעה שגיאה בטעינת השידור החי. אנא נסו שוב מאוחר יותר.
      </Box>
    );
  }

  const opts = {
    height: "280px !important",
    width: "498px !important",
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  return <YouTube videoId={videoId} opts={opts} onStateChange={handleStateChange} />;
}

export default YouTubePlayer;

// import React, { useState, useEffect } from "react";
// import YouTube from "react-youtube";

// function YouTubePlayer({ videoId }) {
//   //   const handleStateChange = (event) => {
//   //     if (event.data === window.YT.PlayerState.ENDED) {
//   //       window.location.href = `https://www.youtube.com/watch?v=${videoId}`; // ישירות מפנה ליוטיוב
//   //     }
//   //   };

//   const [playerStatus, setPlayerStatus] = useState("playing");

//   const handleStateChange = (event) => {
//     if (event.data === window.YT.PlayerState.ENDED) {
//       setPlayerStatus("ended");
//     }
//   };

//   if (playerStatus === "ended") return <div>The live stream has ended. Please check our YouTube channel for more!</div>;

//   const opts = {
//     height: "390",
//     width: "640",
//     playerVars: {
//       autoplay: 1,
//       controls: 1,
//       modestbranding: 1,
//       rel: 0,
//     },
//   };

//   return <YouTube videoId={videoId} opts={opts} onStateChange={handleStateChange} />;
// }

// export default YouTubePlayer;

// //   const [videoId, setVideoId] = useState(null);

// //   useEffect(() => {
// //     async function fetchLiveVideoId() {
// //       const url = `https://www.googleapis.com/youtube/v3/liveBroadcasts?part=snippet&broadcastStatus=active&key=${apiKey}`;
// //       try {
// //         const response = await fetch(url);
// //         const data = await response.json();
// //         if (data.items.length > 0) {
// //           setVideoId(data.items[0].id);
// //         } else {
// //           throw new Error("No live broadcasts found.");
// //         }
// //       } catch (error) {
// //         console.error("Fetching YouTube live video ID failed:", error);
// //       }
// //     }

// //     fetchLiveVideoId();
// //   }, [apiKey]); // רק אם apiKey משתנה נבצע את ה-fetch

// //   if (!videoId) return <div>Loading live video...</div>;
