import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack } from '@mui/material';
import { fetchFromAPI } from '../utils/fetchFormAPI';
import { Link } from 'react-router-dom';
import { CheckCircle } from '@mui/icons-material';
import Videos from './Videos';

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet.statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]))
      .catch((error) => console.error('Error fetching video detail:', error));

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items))
      .catch((error) => console.error('Error fetching related videos:', error));
  }, [id]);

  if (!videoDetail || !videos) {
    return 'Loading'; // or loading indicator
  }

  const { snippet: { title, channelId, channelTitle, thumbnails }, statistics: { viewCount, likeCount } } = videoDetail;
  const subscriberCount = videoDetail.statistics?.subscriberCount;

  return (
    <Box minHeight='95vh'>
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1}>
          <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
            <Typography color="#fff" variant='h5' fontWeight='bold' p={2}>
              {title}
            </Typography>
            <Stack direction='row' justifyContent='space-between' sx={{color: '#fff'}} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: 'subtitle1', md: 'h6'}} color="#fff" display='flex' alignItems='center'>

                  {channelTitle}
                  {subscriberCount && subscriberCount > 100000 ? (<CheckCircle sx={{fontSize: '12px', color: 'gray', ml:'5px'}}/>) : (<CheckCircle sx={{fontSize: '12px', color: 'gray', ml:'5px'}}/>)}
                </Typography>
              </Link>
              <Stack direction='row' gap='20px' alignItems='center'>
                <Typography variant='body1' sx={{ opacity: 0.7}}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant='body1' sx={{ opacity: 0.7}}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{md: 1, xs: 5}} justifyContent='center' alignItems='center'>
          <Videos videos={videos} direction='column'/>
        </Box>
      </Stack>

    </Box>
  );
}

export default VideoDetail;
