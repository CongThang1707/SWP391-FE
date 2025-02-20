import React from 'react';
import { Typography, Container, Grid, Card, CardContent, CardMedia, Button, Box } from '@mui/material';

const blogPosts = [
  {
    title: 'How to Improve Your Coding Skills',
    description: 'Learn the best practices to become a better programmer and write cleaner code.',
    image: 'https://source.unsplash.com/400x250/?technology,coding'
  },
  {
    title: 'Top 10 JavaScript Frameworks in 2025',
    description: 'Explore the most popular JavaScript frameworks and libraries to stay ahead.',
    image: 'https://source.unsplash.com/400x250/?javascript,programming'
  },
  {
    title: 'Why UI/UX Design Matters',
    description: 'Discover how good design improves user experience and engagement.',
    image: 'https://source.unsplash.com/400x250/?design,ux'
  }
];

const BlogPage = () => {
  return (
    <>
      {/* Header */}
      <Box
        sx={{
          height: '40vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(90deg, #1976D2, #42A5F5)',
          color: 'white',
          textAlign: 'center',
          p: 4
        }}
      >
        <Typography variant="h3" fontWeight={700}>
          Welcome to Our Blog
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, maxWidth: '600px' }}>
          Explore our latest articles on technology, design, and development.
        </Typography>
      </Box>

      {/* Blog Posts */}
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {blogPosts.map((post, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ boxShadow: 3 }}>
                <CardMedia component="img" height="200" image={post.image} alt={post.title} />
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: 'gray' }}>
                    {post.description}
                  </Typography>
                  <Button sx={{ mt: 2 }} variant="outlined" color="primary">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ background: '#eee', py: 3, textAlign: 'center' }}>
        <Typography variant="body2">© 2025 My Blog. All rights reserved.</Typography>
      </Box>
    </>
  );
};

export default BlogPage;
