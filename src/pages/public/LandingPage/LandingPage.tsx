// src/pages/public/LandingPage/LandingPage.tsx
import React, { useState } from 'react';
import { GridLegacy as Grid } from '@mui/material';
import heroImage from '../../../assets/images/hero-image.png';
import collaborators from '../../../assets/images/collaborators.png';
import mentalHealthImage from '../../../assets/images/mental-health-challenges.png';
import {
    Box,
    Typography,
    Button,
    Container,
    Card,
    CardContent,
    Avatar,
    Chip,
    IconButton,
    Link,
    AppBar,
    Toolbar
} from '@mui/material';
import {
    ArrowForward,
    Phone,
    Psychology,
    Dashboard,
    Security,
    Language,
    ChevronLeft,
    ChevronRight,
    LinkedIn,
    Twitter,
    Facebook,
    Menu
} from '@mui/icons-material';

const LandingPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const partnerLogos = [
        { name: 'Makerere University', logo: '🎓' },
        { name: 'Butabika Hospital', logo: '🏥' },
        { name: 'Mirembe Hospital', logo: '🏥' },
        { name: 'MOH Uganda', logo: '⚕️' },
        { name: 'WHO', logo: '🌍' },
        { name: 'UNICEF', logo: '🤝' }
    ];

    const platformSlides = [
        {
            title: 'Mobile Call-in',
            description: 'Patients contact hospital call center using their mobile phones to access mental health support in their local language.',
            image: '📱',
            bgColor: '#E8F5F5'
        },
        {
            title: 'AI Voice Processing',
            description: 'Real-time speech recognition, sentiment analysis, and risk assessment powered by advanced AI technology.',
            image: '🤖',
            bgColor: '#FFF3E0'
        },
        {
            title: 'Smart Dashboard',
            description: 'Comprehensive analytics and insights for healthcare providers to monitor and improve patient outcomes.',
            image: '📊',
            bgColor: '#E3F2FD'
        }
    ];

    const userCards = [
        {
            title: 'Patients, Caregivers & General Public',
            description: 'Understand mental health in their language, feel heard and get support',
            color: '#E8F5F5',
            icon: '👥',
            illustration: '👨‍👩‍👧‍👦'
        },
        {
            title: 'Peer Support Workers and Mental Healthcare Providers',
            description: 'Get transcription, sentiment cues and respond better to callers',
            color: '#FFF3E0',
            icon: '👨‍⚕️',
            illustration: '👩‍⚕️'
        },
        {
            title: 'Mental Healthcare Supervisors',
            description: 'Monitor call quality, escalate high-risk cases and guide call agents',
            color: '#E3F2FD',
            icon: '👩‍💼',
            illustration: '📋'
        }
    ];

    const features = [
        {
            icon: '🗨️',
            title: 'Voice-Driven Interactions',
            description: 'Navigate menus and access info by speaking naturally in local languages.',
            mockup: '🎤'
        },
        {
            icon: '🤖',
            title: 'AI-Powered Support',
            description: 'Real-time keyword detection, sentiment analysis, and critical risk flagging.',
            mockup: '🧠'
        },
        {
            icon: '📊',
            title: 'Smart Dashboards',
            description: 'Visual summaries, call quality insights, and supervisory tools.',
            mockup: '📈'
        },
        {
            icon: '🔒',
            title: 'Privacy-First Design',
            description: 'Data opt-in options with anonymization and secure handling.',
            mockup: '🛡️'
        },
        {
            icon: '⚕️',
            title: 'Clinically Informed',
            description: 'Built with mental health professionals and caregivers in Uganda.',
            mockup: '🏥'
        },
        {
            icon: '🌍',
            title: 'Multilingual, Contextual',
            description: 'Trained on local languages and cultural nuances.',
            mockup: '🗣️'
        }
    ];

    const intelligenceFeatures = [
        'Understands patients in Luganda, Swahili, and English via ASR',
        'Provides real-time transcription, emotion detection, and risk flagging',
        'Supports call center agents, supervisors, and clinicians with actionable insights',
        'Enhances call quality, communication and referral decisions',
        'Generates structured data for research, planning, and quality assurance'
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % platformSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + platformSlides.length) % platformSlides.length);
    };

    return (
        <Box>
            {/* Header */}
            <AppBar position="static" sx={{ bgcolor: 'white', color: 'text.primary', boxShadow: 1 }}>
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
                        <Box sx={{
                            width: 40,
                            height: 40,
                            bgcolor: 'primary.main',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 1,
                            fontWeight: 'bold'
                        }}>
                            M
                        </Box>
                        <Typography variant="h6" fontWeight="bold" color="text.primary">
                            MHOP
                        </Typography>
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, mr: 4 }}>
                        <Link href="#about" color="text.primary" underline="none" sx={{ fontWeight: 500 }}>
                            About
                        </Link>
                        <Link href="#features" color="text.primary" underline="none" sx={{ fontWeight: 500 }}>
                            Features
                        </Link>
                        <Link href="#team" color="text.primary" underline="none" sx={{ fontWeight: 500 }}>
                            Team
                        </Link>
                        <Link href="#contact" color="text.primary" underline="none" sx={{ fontWeight: 500 }}>
                            Contact
                        </Link>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button variant="outlined" color="primary" size="small">
                            Create account
                        </Button>
                        <Button variant="contained" color="primary" size="small">
                            Login
                        </Button>
                    </Box>

                    <IconButton sx={{ display: { xs: 'flex', md: 'none' }, ml: 1 }}>
                        <Menu />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <Box sx={{ bgcolor: '#fafafa', py: { xs: 6, md: 10 } }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h2"
                                component="h1"
                                gutterBottom
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#2c3e50',
                                    fontSize: { xs: '2rem', md: '2.5rem' }
                                }}
                            >
                                Transforming Mental Health Support through Voice and AI
                            </Typography>
                            <Typography
                                variant="h6"
                                color="text.secondary"
                                paragraph
                                sx={{ mb: 4, fontSize: { xs: '1rem', md: '1.25rem' } }}
                            >
                                A pioneering initiative using Natural Language Processing (NLP) and Automatic
                                Speech Recognition (ASR) to improve mental health services in Uganda
                                and Tanzania.
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                endIcon={<ArrowForward />}
                                sx={{
                                    borderRadius: 3,
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    textTransform: 'none'
                                }}
                            >
                                Explore the Platform
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box
                                component="img"
                                src={heroImage}
                                alt="MHOP Platform Interface"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: 3,
                                    boxShadow: 3,
                                    objectFit: 'cover',
                                    maxHeight: 400
                                }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Partners Section */}
            <Box sx={{ py: 6, bgcolor: 'white' }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h6"
                        textAlign="center"
                        color="text.secondary"
                        gutterBottom
                        sx={{ mb: 4 }}
                    >
                        In Collaboration With
                    </Typography>
                    <Grid item xs={12} md={6}>
  <Box
    component="img"
    src={collaborators}
    alt="Mental Health Challenges in Africa"
    sx={{
      width: '100%',
      height: 300,
      objectFit: 'contain',
      borderRadius: 3,
      boxShadow: 0
    }}
  />
</Grid>
                </Container>
            </Box>

            {/* Mental Health Barriers Section */}
            <Box sx={{ py: 8, bgcolor: '#fafafa' }}>
  <Container maxWidth="lg">
    <Grid container spacing={6} alignItems="center">
    <Grid item xs={12} md={6}>
  <Box
    component="img"
    src={mentalHealthImage}
    alt="Mental Health Challenges in Africa"
    sx={{
      width: '100%',
      height: 300,
      objectFit: 'cover',
      borderRadius: 3,
      boxShadow: 2
    }}
  />
</Grid>
      <Grid item xs={12} md={6}>
        <Typography
          variant="h3"
          gutterBottom
          fontWeight="bold"
          sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' } }}
        >
          Mental health in Africa faces critical barriers
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          <strong>Stigma, limited access, language gaps</strong>, and overburdened healthcare systems.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          In Uganda, only <strong>16.5% of depression cases</strong> and <strong>1.3% of alcohol use disorder</strong>
          cases seek treatment. Many patients speak local languages, but most digital
          solutions are built in English.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This platform bridges that gap by empowering providers and patients through
          intelligent, context-aware voice technology.
        </Typography>
      </Grid>
    </Grid>
  </Container>
</Box>

            {/* Voice Meets Intelligence Section */}
            <Box sx={{ py: 8, bgcolor: 'primary.main', color: 'white' }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h3"
                        textAlign="center"
                        gutterBottom
                        fontWeight="bold"
                        sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' } }}
                    >
                        Voice Meets Intelligence
                    </Typography>
                    <Typography
                        variant="h6"
                        textAlign="center"
                        sx={{ color: 'rgba(255,255,255,0.8)', mb: 6 }}
                    >
                        A digital platform that:
                    </Typography>

                    <Box sx={{ mt: 6 }}>
                        {intelligenceFeatures.map((feature, index) => (
                            <Box key={index} sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 3,
                                mb: 3,
                                bgcolor: 'rgba(255,255,255,0.1)',
                                p: 3,
                                borderRadius: 2,
                                backdropFilter: 'blur(10px)'
                            }}>
                                <Box sx={{
                                    minWidth: 50,
                                    height: 50,
                                    bgcolor: 'secondary.main',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'black',
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem'
                                }}>
                                    {index + 1}
                                </Box>
                                <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                                    {feature}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* Empowering Users Section */}
            <Box sx={{ py: 8, bgcolor: 'white' }}>
                <Container maxWidth="lg">
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 6,
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 2
                    }}>
                        <Typography
                            variant="h3"
                            fontWeight="bold"
                            sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' } }}
                        >
                            Empowering These Users
                        </Typography>
                        <Box>
                            <IconButton onClick={prevSlide} sx={{ bgcolor: '#f5f5f5', mr: 1 }}>
                                <ChevronLeft />
                            </IconButton>
                            <IconButton onClick={nextSlide} sx={{ bgcolor: '#f5f5f5' }}>
                                <ChevronRight />
                            </IconButton>
                        </Box>
                    </Box>

                    <Grid container spacing={4}>
                        {userCards.map((card, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Card sx={{
                                    height: '100%',
                                    bgcolor: card.color,
                                    borderRadius: 3,
                                    boxShadow: 2,
                                    transition: 'transform 0.2s',
                                    '&:hover': { transform: 'translateY(-5px)' }
                                }}>
                                    <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ minHeight: '3rem' }}>
                                            {card.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flex: 1 }}>
                                            {card.description}
                                        </Typography>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: 80
                                        }}>
                                            <Box sx={{ fontSize: '3rem' }}>
                                                {card.illustration}
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Inside the Platform Section */}
            <Box sx={{ py: 8, bgcolor: '#fafafa' }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h3"
                        textAlign="center"
                        gutterBottom
                        fontWeight="bold"
                        sx={{ mb: 6, fontSize: { xs: '1.75rem', md: '2.5rem' } }}
                    >
                        Inside the Platform
                    </Typography>

                    <Box sx={{ position: 'relative' }}>
                        <Grid container spacing={4} alignItems="center">
                            <Grid item xs={12} md={6}>
                                <Typography variant="h4" gutterBottom fontWeight="bold">
                                    {platformSlides[currentSlide].title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                                    {platformSlides[currentSlide].description}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box sx={{
                                    bgcolor: platformSlides[currentSlide].bgColor,
                                    borderRadius: 3,
                                    height: 300,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: 2
                                }}>
                                    <Box sx={{ fontSize: '4rem', mb: 2 }}>
                                        {platformSlides[currentSlide].image}
                                    </Box>
                                    <Typography variant="h6" color="text.secondary">
                                        {platformSlides[currentSlide].title}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 4 }}>
                            {platformSlides.map((_, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: '50%',
                                        bgcolor: index === currentSlide ? 'secondary.main' : '#ddd',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                    onClick={() => setCurrentSlide(index)}
                                />
                            ))}
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Platform Highlights Section */}
            <Box sx={{ py: 8, bgcolor: 'white' }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h3"
                        textAlign="center"
                        gutterBottom
                        fontWeight="bold"
                        sx={{ mb: 6, fontSize: { xs: '1.75rem', md: '2.5rem' } }}
                    >
                        Platform Highlights
                    </Typography>

                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card sx={{
                                    height: '100%',
                                    borderRadius: 3,
                                    boxShadow: 2,
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: 4
                                    }
                                }}>
                                    <CardContent sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <Box sx={{ mb: 3 }}>
                                            <Box sx={{ fontSize: '3rem', mb: 2 }}>
                                                {feature.icon}
                                            </Box>
                                            <Box sx={{ fontSize: '2rem', opacity: 0.6 }}>
                                                {feature.mockup}
                                            </Box>
                                        </Box>
                                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Built for Africa Section */}
            <Box sx={{ py: 8, bgcolor: 'primary.main', color: 'white' }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h3"
                        textAlign="center"
                        gutterBottom
                        fontWeight="bold"
                        sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' } }}
                    >
                        Built for Africa, In Africa
                    </Typography>
                    <Typography
                        variant="body1"
                        textAlign="center"
                        sx={{
                            maxWidth: 800,
                            mx: 'auto',
                            mb: 4,
                            fontSize: '1.1rem',
                            lineHeight: 1.7
                        }}
                    >
                        Co-developed by <strong>Makerere University</strong> in collaboration with healthcare professionals from
                        <strong> Butabika Hospital</strong> in Uganda and <strong>Mirembe Hospital</strong> in Tanzania. The platform prioritizes
                        language inclusion and upholds ethical AI principles; transparency, data rights, and
                        community involvement.
                    </Typography>
                    <Box textAlign="center">
                        <Button
                            variant="outlined"
                            size="large"
                            endIcon={<ArrowForward />}
                            sx={{
                                borderRadius: 3,
                                px: 4,
                                py: 1.5,
                                borderColor: 'white',
                                color: 'white',
                                fontSize: '1.1rem',
                                textTransform: 'none',
                                '&:hover': {
                                    borderColor: 'white',
                                    bgcolor: 'rgba(255,255,255,0.1)'
                                }
                            }}
                        >
                            Explore the Platform
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* Footer */}
            <Box sx={{ py: 6, bgcolor: '#f8f9fa' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                <Box sx={{ fontSize: '2rem' }}>🧠</Box>
                                <Typography variant="h6" fontWeight="bold">
                                    Makerere AI Lab
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <IconButton size="small" sx={{ bgcolor: 'white', boxShadow: 1 }}>
                                    <LinkedIn />
                                </IconButton>
                                <IconButton size="small" sx={{ bgcolor: 'white', boxShadow: 1 }}>
                                    <Twitter />
                                </IconButton>
                                <IconButton size="small" sx={{ bgcolor: 'white', boxShadow: 1 }}>
                                    <Facebook />
                                </IconButton>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Quick Links
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Link href="#" color="inherit" underline="none">Home</Link>
                                <Link href="#" color="inherit" underline="none">Research Protocol</Link>
                                <Link href="#" color="inherit" underline="none">Project Team</Link>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Contact Info
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Makerere University Kampala
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    +256 701 726 338
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    joyce.nabuende@mak.ac.ug
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid #e0e0e0', textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Copyright © 2025 Mak-AI | Makerere University Kampala
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default LandingPage;