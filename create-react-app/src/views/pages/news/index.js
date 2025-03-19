// NewsPage.js
import React from 'react';
import {
    Typography,
    Container,
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Divider
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
// import imageSrc from '../../../assets/images/Child_banner.jpg';

const NewsPage = () => {
    return (
        <>
            {/* Header */}
            <Box
                sx={{
                    height: '60vh',
                    width: '100%', // Chiếm toàn bộ chiều ngang
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'linear-gradient(90deg, #1565C0, #64B5F6)',
                    backgroundImage: `url(https://i.pinimg.com/474x/7d/e1/43/7de143dd7f288afaca032c161c4680a5.jpg)`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center', // Canh giữa
                    color: 'white',
                    textAlign: 'center',
                    p: 4,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h3" fontWeight={700} sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                    News & Updates
                </Typography>
                <Typography variant="h6" sx={{ mt: 2, maxWidth: '600px', opacity: 0.9 }}>
                    Stay updated with the latest news, articles, and updates about child growth and health.
                </Typography>
            </Box>

            {/* News Articles */}
            <Container sx={{ py: 6 }}>
                <Grid container spacing={4}>
                    {/* Article 1 */}
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                height: '100%',
                                boxShadow: 3,
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-10px)', // Di chuyển lên 10px
                                    boxShadow: 20, // Đổ bóng đậm hơn
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="500"
                                image="https://i.pinimg.com/736x/5a/fb/ae/5afbae8daddc6315114cb8cce84d7472.jpg"
                                alt="Child Health"
                            />
                            <CardContent>
                                <Typography variant="h6" fontWeight={700} gutterBottom fontSize={28}>
                                    Importance of Early Childhood Nutrition
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Proper nutrition during early childhood is crucial for healthy development and growth.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Article 2 */}
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                height: '100%',
                                boxShadow: 3,
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-10px)', // Di chuyển lên 10px
                                    boxShadow: 20, // Đổ bóng đậm hơn
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="500"
                                image="https://i.pinimg.com/474x/05/f5/80/05f5806d9c5c2f1110dfe4e2fdb8f5e3.jpg"
                                alt="Child Education"
                            />
                            <CardContent>
                                <Typography variant="h6" fontWeight={700} gutterBottom fontSize={28}>
                                    The Role of Play in Child Development
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Discover how play contributes to a child&#39;s cognitive, emotional, and physical growth.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Article 3 */}
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                height: '100%',
                                boxShadow: 3,
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-10px)', // Di chuyển lên 10px
                                    boxShadow: 20, // Đổ bóng đậm hơn
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="500"
                                image="https://i.pinimg.com/474x/e2/37/38/e23738b42831e0fa929e60bba34f12bf.jpg"
                                alt="Parenting"
                            />
                            <CardContent>
                                <Typography variant="h6" fontWeight={700} fontSize={28}>
                                    Parenting Tips for Modern Families
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Learn effective parenting techniques to nurture your child&#39;s potential.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* Article 4 */}
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                height: '100%',
                                boxShadow: 3,
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-10px)', // Di chuyển lên 10px
                                    boxShadow: 20, // Đổ bóng đậm hơn
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="500"
                                image="https://i.pinimg.com/474x/93/e5/ae/93e5ae3c12ddd3dd0a68d2ba774af115.jpg"
                                alt="Child Growth"
                            />
                            <CardContent>
                                <Typography variant="h6" fontWeight={700} gutterBottom fontSize={28}>
                                    Understanding Growth Spurts in Children
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Growth spurts are critical phases in a child&#39;s development. Learn how to support them during these periods.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Article 5 */}
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                height: '100%',
                                boxShadow: 3,
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-10px)', // Di chuyển lên 10px
                                    boxShadow: 20, // Đổ bóng đậm hơn
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="500"
                                image="https://i.pinimg.com/474x/38/e0/76/38e07634daca1c5159979c85b1ac31c5.jpg"
                                alt="Exercise for Kids"
                            />
                            <CardContent>
                                <Typography variant="h6" fontWeight={700} gutterBottom fontSize={28}>
                                    How Exercise Impacts Your Child’s Height and Weight
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Regular physical activities not only improve health but also positively impact height and weight development.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Article 6 */}
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                height: '100%',
                                boxShadow: 3,
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-10px)', // Di chuyển lên 10px
                                    boxShadow: 20, // Đổ bóng đậm hơn
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="500"
                                image="https://i.pinimg.com/474x/54/63/f8/5463f879dafecd317b771aaee0d4a0aa.jpg"
                                alt="Healthy Food"
                            />
                            <CardContent>
                                <Typography variant="h6" fontWeight={700} gutterBottom fontSize={28}>
                                    Top 5 Superfoods to Boost Your Child’s Growth
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Discover nutrient-rich foods that help improve your child&#39;s height, bone health, and immune system.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Article 7 */}
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                height: '100%',
                                boxShadow: 3,
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-10px)', // Di chuyển lên 10px
                                    boxShadow: 20, // Đổ bóng đậm hơn
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="500"
                                image="https://i.pinimg.com/736x/22/15/87/221587ee3c7b5bdcbd199e927f8b69a3.jpg"
                                alt="Child Health Checkup"
                            />
                            <CardContent>
                                <Typography variant="h6" fontWeight={700} gutterBottom fontSize={28}>
                                    Importance of Regular Health Check-Ups
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Routine check-ups help track your child’s height, weight, and overall health for early detection of issues.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Article 8 */}
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                height: '100%',
                                boxShadow: 3,
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-10px)', // Di chuyển lên 10px
                                    boxShadow: 20, // Đổ bóng đậm hơn
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="500"
                                image="https://i.pinimg.com/474x/b0/4b/9f/b04b9fe65b798de1ec4ce8692cb20834.jpg"
                                alt="Calcium for Kids"
                            />
                            <CardContent>
                                <Typography variant="h6" fontWeight={700} gutterBottom fontSize={28}>
                                    The Role of Calcium and Vitamin D in Growing Taller
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Ensure your child gets enough calcium and vitamin D to build strong bones and support height growth.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Article 9 */}
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                height: '100%',
                                boxShadow: 3,
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-10px)', // Di chuyển lên 10px
                                    boxShadow: 20, // Đổ bóng đậm hơn
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="500"
                                image="https://i.pinimg.com/474x/ee/74/b0/ee74b0b50bf3d33a36a97ffb501568da.jpg"
                                alt="Child Sleeping"
                            />
                            <CardContent>
                                <Typography variant="h6" fontWeight={700} gutterBottom fontSize={28}>
                                    Why Quality Sleep is Vital for Child Growth
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Sleep is when growth hormones are released the most. Learn the ideal sleep duration by age.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* You can add more articles below as needed */}
                </Grid>
            </Container>

            {/* Footer */}
            <Box sx={{ background: '#333', py: 4, color: 'white', padding: '3rem' }}>
                <Container>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" fontWeight={700} mb={2} color={'white'} fontSize={20}>
                                About Us
                            </Typography>
                            <Typography variant="body2" color={'white'} fontSize={15}>
                                We provide trusted news and articles focused on child development, parenting, and health tips to help parents and caregivers raise healthy, happy children.
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" fontWeight={700} mb={2} color={'white'} fontSize={20}>
                                Contact
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <EmailOutlinedIcon sx={{ mr: 1, fontSize: 20 }} />
                                <Typography variant="body2" color={'white'} fontSize={15}>Email: tienvnse183132@gmail.com</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <LocalPhoneOutlinedIcon sx={{ mr: 1, fontSize: 20 }} />
                                <Typography variant="body2" color={'white'} fontSize={15}>Phone: 094-424-6472</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <HomeOutlinedIcon sx={{ mr: 1, fontSize: 20 }} />
                                <Typography variant="body2" color={'white'} fontSize={15}>Address: Thu Duc City, Ho Chi Minh City, Vietnam</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" fontWeight={700} mb={2} color={'white'} fontSize={20}>
                                Follow Us
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        transition: '0.3s',
                                        textDecoration: 'none',
                                        color: 'white',
                                        '&:hover': { color: '#3b5998' }
                                    }}
                                    component="a"
                                    href="https://www.facebook.com/yourpage"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Facebook sx={{ mr: 1, fontSize: 20 }} />
                                    <Typography variant="body2" fontSize={15} color={'white'}>
                                        Facebook
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        transition: '0.3s',
                                        textDecoration: 'none',
                                        color: 'white',
                                        '&:hover': { color: '#1DA1F2' }
                                    }}
                                    component="a"
                                    href="https://www.twitter.com/yourpage"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Twitter sx={{ mr: 1, fontSize: 20 }} />
                                    <Typography variant="body2" fontSize={15} color={'white'}>
                                        Twitter
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        transition: '0.3s',
                                        textDecoration: 'none',
                                        color: 'white',
                                        '&:hover': { color: '#C13584' }
                                    }}
                                    component="a"
                                    href="https://www.instagram.com/yourpage"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Instagram sx={{ mr: 1, fontSize: 20 }} />
                                    <Typography variant="body2" fontSize={15} color={'white'}>
                                        Instagram
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Divider sx={{ borderColor: '#424242' }} />
            {/* Copyright footer */}
            <Box sx={{ background: '#333', py: 2, textAlign: 'center', color: 'white', padding: '2rem' }}>
                <Typography variant="body2" color={'white'} fontSize={15}>© 2025 CHILDGROWTH NEWS. Empowering Parents & Protecting Childhood.</Typography>
            </Box>
        </>
    );
};

export default NewsPage;
