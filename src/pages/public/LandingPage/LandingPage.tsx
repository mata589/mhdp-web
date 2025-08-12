import React, { useState } from 'react';
import { GridLegacy as Grid } from '@mui/material';
import heroImage from '../../../assets/images/hero-image.png';
import voiceInteractionsImage from '../../../assets/images/voiceInteractionsImage.png';
import aiSupportImage from '../../../assets/images/aiSupportImage.png';
import dashboardsImage from '../../../assets/images/dashboardsImage.png';
import privacyImage from '../../../assets/images/privacyImage.png';
import multilingualImage from '../../../assets/images/multilingualImage.png';
import clinicalImage from '../../../assets/images/clinicalImage.png';
import collaborators from '../../../assets/images/collaborators.png';
import mentalHealthImage from '../../../assets/images/mental-health-challenges.png';
import patientsSketchImage from '../../../assets/images/patientsSketchImage.png';
import lablogos from '../../../assets/images/lablogos.png';
import providersSketchImage from '../../../assets/images/providersSketchImage.png';
import supervisorsSketchImage from '../../../assets/images/supervisorsSketchImage.png';
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
        <Box sx={{ minHeight: '100vh', width: '100%' }}>
            {/* Header */}
            <AppBar position="static" sx={{ bgcolor: 'white', color: 'text.primary', boxShadow: 2 }}>
                <Toolbar sx={{ px: { xs: 3, md: 6 }, py: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
                        <Box sx={{
                            width: 48,
                            height: 48,
                            bgcolor: 'primary.main',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 2,
                            fontWeight: 'bold',
                            fontSize: '1.2rem'
                        }}>
                            M
                        </Box>
                        <Typography variant="h5" fontWeight="bold" color="text.primary">
                            MHOP
                        </Typography>
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 6, mr: 6 }}>
                        <Link href="#about" color="text.primary" underline="none" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                            About
                        </Link>
                        <Link href="#features" color="text.primary" underline="none" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                            Features
                        </Link>
                        <Link href="#team" color="text.primary" underline="none" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                            Team
                        </Link>
                        <Link href="#contact" color="text.primary" underline="none" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                            Contact
                        </Link>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 3 }}>
                        <Button variant="outlined" color="primary" size="medium" sx={{ px: 3, py: 1.2, fontSize: '1rem' }}>
                            Create account
                        </Button>
                        <Button variant="contained" color="primary" size="medium" sx={{ px: 3, py: 1.2, fontSize: '1rem' }}>
                            Login
                        </Button>
                    </Box>

                    <IconButton sx={{ display: { xs: 'flex', md: 'none' }, ml: 2 }}>
                        <Menu />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <Box sx={{ bgcolor: '#fafafa', py: { xs: 10, md: 16 } }}>
                <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6 } }}>
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h1"
                                component="h1"
                                gutterBottom
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#2c3e50',
                                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                                    lineHeight: { xs: 1.2, md: 1.3 },
                                    mb: 4
                                }}
                            >
                                Transforming Mental Health Support through Voice and AI
                            </Typography>
                            <Typography
                                variant="h5"
                                color="text.secondary"
                                paragraph
                                sx={{ 
                                    mb: 6, 
                                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                                    lineHeight: 1.6,
                                    maxWidth: '90%'
                                }}
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
                                    px: 6,
                                    py: 2,
                                    fontSize: '1.3rem',
                                    textTransform: 'none',
                                    boxShadow: 3
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
                                    height: { xs: 400, md: 500 },
                                    //bgcolor: '#e3f2fd',
                                    borderRadius: 4,
                                    //boxShadow: 4,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '6rem'
                                }}
                            >
                                
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Partners Section */}
            <Box sx={{ py: 10, bgcolor: 'white' }}>
                <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6 } }}>
                    <Typography
                        variant="h4"
                        textAlign="center"
                        color="text.secondary"
                        gutterBottom
                        sx={{ mb: 8, fontWeight: 600 }}
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
            <Box sx={{ py: 12, bgcolor: '#fafafa' }}>
                <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6 } }}>
                    <Grid container spacing={8} alignItems="center">
                        <Grid item xs={12} md={6}>
                        <Box
    component="img"
    src={mentalHealthImage}
    alt="Mental Health Challenges in Africa"
    sx={{
      width: '100%',
      height: { xs: 300, md: 450 },
      objectFit: 'cover',
      borderRadius: 3,
      //boxShadow: 2
    }}
  />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h2"
                                gutterBottom
                                fontWeight="bold"
                                sx={{ 
                                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                                    lineHeight: 1.2,
                                    mb: 4
                                }}
                            >
                                Mental health in Africa faces critical barriers
                            </Typography>
                            <Typography variant="h6" color="text.secondary" paragraph sx={{ fontSize: '1.3rem', mb: 3 }}>
                                <strong>Stigma, limited access, language gaps</strong>, and overburdened healthcare systems.
                            </Typography>
                            <Typography variant="h6" color="text.secondary" paragraph sx={{ fontSize: '1.3rem', mb: 3 }}>
                                In Uganda, only <strong>16.5% of depression cases</strong> and <strong>1.3% of alcohol use disorder</strong>
                                cases seek treatment. Many patients speak local languages, but most digital
                                solutions are built in English.
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ fontSize: '1.3rem' }}>
                                This platform bridges that gap by empowering providers and patients through
                                intelligent, context-aware voice technology.
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Voice Meets Intelligence Section */}
            <Box sx={{ py: 12, bgcolor: 'white' }}>
                <Container maxWidth="lg" sx={{ px: { xs: 3, md: 6 } }}>
                    <Box sx={{ 
                        py: 10, 
                        px: 6,
                        bgcolor: '#2C5280', 
                        color: 'white',
                        borderRadius: 6,
                        boxShadow: 4
                    }}>
                        <Typography
                            variant="h2"
                            textAlign="center"
                            gutterBottom
                            fontWeight="bold"
                            sx={{ 
                                fontSize: { xs: '2.5rem', md: '3.5rem' }, 
                                mb: 4 
                            }}
                        >
                            Voice Meets Intelligence
                        </Typography>
                        <Typography
                            variant="h6"
                            textAlign="center"
                            sx={{ 
                                color: 'rgba(255,255,255,0.9)', 
                                mb: 8, 
                                fontSize: '1.3rem',
                                maxWidth: 600,
                                mx: 'auto'
                            }}
                        >
                            A digital platform that:
                        </Typography>

                        <Box sx={{ mt: 6 }}>
                            {intelligenceFeatures.map((feature, index) => (
                                <Box key={index} sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 4,
                                    mb: 4,
                                    bgcolor: 'white',
                                    color: 'black',
                                    p: 4,
                                    borderRadius: 4,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}>
                                    <Box sx={{
                                        minWidth: 50,
                                        height: 50,
                                        bgcolor: '#FFA726',
                                        borderRadius: 3,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        mt: 0.5
                                    }}>
                                        <Box sx={{
                                            width: 30,
                                            height: 30,
                                            bgcolor: 'white',
                                            borderRadius: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1rem',
                                            fontWeight: 'bold',
                                            color: '#FFA726'
                                        }}>
                                            ✓
                                        </Box>
                                    </Box>
                                    <Typography variant="h6" sx={{ 
                                        fontSize: '1.2rem',
                                        lineHeight: 1.5,
                                        fontWeight: 500
                                    }}>
                                        {feature}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Platform Highlights Section */}
            <Box sx={{ py: 12, bgcolor: '#f8f9fa' }}>
                <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6 } }}>
                    <Typography
                        variant="h2"
                        textAlign="center"
                        gutterBottom
                        fontWeight="bold"
                        sx={{ 
                            fontSize: { xs: '2.5rem', md: '3.5rem' }, 
                            mb: 10,
                            color: '#2d3748'
                        }}
                    >
                        Platform Highlights
                    </Typography>

                    <Grid container spacing={6}>
                        {/* Voice-Driven Interactions */}
                        <Grid item xs={12} md={4}>
                            <Box sx={{
                                bgcolor: 'white',
                                p: 6,
                                borderRadius: 4,
                                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                height: 450,
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-8px)'
                                }
                            }}>
                                <Typography variant="h4" fontWeight="bold" sx={{ mb: 3, color: '#2d3748' }}>
                                    Voice-Driven Interactions
                                </Typography>
                                <Typography variant="h6" sx={{ mb: 4, color: '#718096', lineHeight: 1.6 }}>
                                    Navigate menus and access info by speaking naturally in local languages.
                                </Typography>
                                <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'center' }}>
                       
                    </Box>
                    <Box 
                                component="img"
                                src={voiceInteractionsImage}
                                alt="Voice-Driven Interactions"
                                sx={{ 
                                    mt: 'auto', 
                                    display: 'flex', 
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 200,
                                    bgcolor: '#fff3e0',
                                    borderRadius: 3,
                                    fontSize: '4rem'
                                }}>
                                    
                                </Box>
                            </Box>
                        </Grid>

                        {/* AI-Powered Support */}
                        <Grid item xs={12} md={4}>
                            <Box sx={{
                                bgcolor: 'white',
                                p: 6,
                                borderRadius: 4,
                                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                height: 450,
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-8px)'
                                }
                            }}>
                                <Typography variant="h4" fontWeight="bold" sx={{ mb: 3, color: '#2d3748' }}>
                                    AI-Powered Support
                                </Typography>
                                <Typography variant="h6" sx={{ mb: 4, color: '#718096', lineHeight: 1.6 }}>
                                    Real-time keyword detection, sentiment analysis, and critical risk flagging.
                                </Typography>
                                <Box 
                                component="img"
                                src={aiSupportImage}
                                alt="AI-Powered Support Dashboard"
                                sx={{ 
                                    mt: 'auto', 
                                    display: 'flex', 
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 200,
                                    bgcolor: '#fff3e0',
                                    borderRadius: 3,
                                    fontSize: '4rem'
                                }}>
                                    
                                </Box>
                            </Box>
                        </Grid>

                        {/* Smart Dashboards */}
                        <Grid item xs={12} md={4}>
                            <Box sx={{
                                bgcolor: 'white',
                                p: 6,
                                borderRadius: 4,
                                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                height: 450,
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-8px)'
                                }
                            }}>
                                <Typography variant="h4" fontWeight="bold" sx={{ mb: 3, color: '#2d3748' }}>
                                    Smart Dashboards
                                </Typography>
                                <Typography variant="h6" sx={{ mb: 4, color: '#718096', lineHeight: 1.6 }}>
                                    Visual summaries, call quality insights, and supervisor tools.
                                </Typography>
                                <Box
                                 component="img"
                                 src={dashboardsImage}
                                 alt="Smart Dashboards"
                                sx={{ 
                                    mt: 'auto', 
                                    display: 'flex', 
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 200,
                                    bgcolor: '#e3f2fd',
                                    borderRadius: 3,
                                    fontSize: '4rem'
                                }}>
                                    
                                </Box>
                            </Box>
                        </Grid>

                        {/* Privacy-First Design */}
                        <Grid item xs={12} md={4}>
                            <Box sx={{
                                bgcolor: 'white',
                                p: 6,
                                borderRadius: 4,
                                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                height: 450,
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-8px)'
                                }
                            }}>
                                <Typography variant="h4" fontWeight="bold" sx={{ mb: 3, color: '#2d3748' }}>
                                    Privacy-First Design
                                </Typography>
                                <Typography variant="h6" sx={{ mb: 4, color: '#718096', lineHeight: 1.6 }}>
                                    Data opt-in options with anonymization and secure handling.
                                </Typography>
                                <Box
                                 component="img"
                                 src={privacyImage}
                                 alt="Privacy-First Design"
                                sx={{ 
                                    mt: 'auto', 
                                    display: 'flex', 
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 200,
                                    bgcolor: '#f3e5f5',
                                    borderRadius: 3,
                                    fontSize: '4rem'
                                }}>
                                    
                                </Box>
                            </Box>
                        </Grid>

                        {/* Clinically Informed */}
                        <Grid item xs={12} md={4}>
                            <Box sx={{
                                bgcolor: 'white',
                                p: 6,
                                borderRadius: 4,
                                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                height: 450,
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-8px)'
                                }
                            }}>
                                <Typography variant="h4" fontWeight="bold" sx={{ mb: 3, color: '#2d3748' }}>
                                    Clinically Informed
                                </Typography>
                                <Typography variant="h6" sx={{ mb: 4, color: '#718096', lineHeight: 1.6 }}>
                                    Built with mental health professionals and caregivers in the loop
                                </Typography>
                                <Box 
                                 component="img"
                                 src={clinicalImage}
                                 alt="Clinically Informed"
                                sx={{ 
                                    mt: 'auto', 
                                    display: 'flex', 
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 200,
                                    bgcolor: '#e8f5e8',
                                    borderRadius: 3,
                                    fontSize: '4rem'
                                }}>
                                    
                                </Box>
                            </Box>
                        </Grid>

                        {/* Multilingual, Contextual */}
                        <Grid item xs={12} md={4}>
                            <Box sx={{
                                bgcolor: 'white',
                                p: 6,
                                borderRadius: 4,
                                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                height: 450,
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-8px)'
                                }
                            }}>
                                <Typography variant="h4" fontWeight="bold" sx={{ mb: 3, color: '#2d3748' }}>
                                    Multilingual, Contextual
                                </Typography>
                                <Typography variant="h6" sx={{ mb: 4, color: '#718096', lineHeight: 1.6 }}>
                                    Trained on local languages and cultural nuances.
                                </Typography>
                                <Box 
                                 component="img"
                                 src={multilingualImage}
                                 alt="Multilingual Support"
                                sx={{ 
                                    mt: 'auto', 
                                    display: 'flex', 
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 200,
                                    bgcolor: '#fef7e0',
                                    borderRadius: 3,
                                    fontSize: '4rem'
                                }}>
                                    
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Empowering Users Section */}
            <Box sx={{ py: 12, bgcolor: 'white' }}>
                <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6 } }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 10,
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 4
                    }}>
                        <Typography
                            variant="h2"
                            fontWeight="bold"
                            sx={{ 
                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                                color: '#2d3748'
                            }}
                        >
                            Empowering These Users
                        </Typography>
                        <Box>
                            <IconButton 
                                onClick={prevSlide} 
                                sx={{ 
                                    bgcolor: 'white', 
                                    mr: 2,
                                    border: '2px solid #e2e8f0',
                                    width: 50,
                                    height: 50,
                                    '&:hover': { bgcolor: '#f7fafc' }
                                }}
                            >
                                <ChevronLeft />
                            </IconButton>
                            <IconButton 
                                onClick={nextSlide} 
                                sx={{ 
                                    bgcolor: '#319795', 
                                    color: 'white',
                                    width: 50,
                                    height: 50,
                                    '&:hover': { bgcolor: '#2c7a7b' }
                                }}
                            >
                                <ChevronRight />
                            </IconButton>
                        </Box>
                    </Box>

                    <Grid container spacing={6}>
                        {/* Patients, Caregivers & General Public */}
                        <Grid item xs={12} md={4}>
                            <Box sx={{
                                height: 500,
                                bgcolor: '#bee3f8',
                                borderRadius: 6,
                                p: 6,
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-8px)'
                                }
                            }}>
                                <Typography 
                                    variant="h4" 
                                    fontWeight="bold" 
                                    sx={{ 
                                        mb: 3,
                                        color: '#2b6cb0',
                                        fontSize: '1.5rem',
                                        lineHeight: 1.3
                                    }}
                                >
                                    Patients, Caregivers & General Public
                                </Typography>
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        mb: 6,
                                        color: '#2b6cb0',
                                        fontSize: '1.1rem',
                                        lineHeight: 1.5
                                    }}
                                >
                                    Understand mental health in their language, feel heard and get support
                                </Typography>
                                <Box sx={{ 
                                    mt: 'auto',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'flex-end',
                                    height: '250px',
                                    fontSize: '6rem'
                                }}>
                                     <Box
                            component="img"
                            src={patientsSketchImage}
                            alt="Patients and Caregivers"
                            sx={{
                                width: '100%',
                                maxWidth: 200,
                                height: 'auto',
                                objectFit: 'contain'
                            }}
                        />
                                </Box>
                            </Box>
                        </Grid>

                        {/* Peer Support Workers and Mental Healthcare Providers */}
                        <Grid item xs={12} md={4}>
                            <Box sx={{
                                height: 500,
                                bgcolor: '#faf089',
                                borderRadius: 6,
                                p: 6,
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-8px)'
                                }
                            }}>
                                <Typography 
                                    variant="h4" 
                                    fontWeight="bold" 
                                    sx={{ 
                                        mb: 3,
                                        color: '#744210',
                                        fontSize: '1.5rem',
                                        lineHeight: 1.3
                                    }}
                                >
                                    Peer Support Workers and Mental Healthcare Providers
                                </Typography>
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        mb: 6,
                                        color: '#744210',
                                        fontSize: '1.1rem',
                                        lineHeight: 1.5
                                    }}
                                >
                                    Get transcription, sentiment cues and respond better to callers
                                </Typography>
                                <Box sx={{ 
                                    mt: 'auto',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'flex-end',
                                    height: '250px',
                                    fontSize: '6rem'
                                }}>
                                     <Box
                            component="img"
                            src={providersSketchImage}
                            alt="Healthcare Providers"
                            sx={{
                                width: '100%',
                                maxWidth: 200,
                                height: 'auto',
                                objectFit: 'contain'
                            }}
                        />
                                </Box>
                            </Box>
                        </Grid>

                        {/* Mental Healthcare Supervisors */}
                        <Grid item xs={12} md={4}>
                            <Box sx={{
                                height: 500,
                                bgcolor: '#cbd5e0',
                                borderRadius: 6,
                                p: 6,
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-8px)'
                                }
                            }}>
                                <Typography 
                                    variant="h4" 
                                    fontWeight="bold" 
                                    sx={{ 
                                        mb: 3,
                                        color: '#2d3748',
                                        fontSize: '1.5rem',
                                        lineHeight: 1.3
                                    }}
                                >
                                    Mental Healthcare Supervisors
                                </Typography>
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        mb: 6,
                                        color: '#2d3748',
                                        fontSize: '1.1rem',
                                        lineHeight: 1.5
                                    }}
                                >
                                    Monitor call quality, escalate high-risk cases and guide call agents
                                </Typography>
                                <Box sx={{ 
                                    mt: 'auto',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'flex-end',
                                    height: '250px',
                                    fontSize: '6rem'
                                }}>
                                    <Box
                            component="img"
                            src={supervisorsSketchImage}
                            alt="Healthcare Supervisors"
                            sx={{
                                width: '100%',
                                maxWidth: 200,
                                height: 'auto',
                                objectFit: 'contain'
                            }}
                        />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Inside the Platform Section */}
            <Box sx={{ py: 12, bgcolor: '#fafafa' }}>
                <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6 } }}>
                    <Typography
                        variant="h2"
                        textAlign="center"
                        gutterBottom
                        fontWeight="bold"
                        sx={{ 
                            mb: 10, 
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                            color: '#2d3748'
                        }}
                    >
                        Inside the Platform
                    </Typography>

                    <Box sx={{ position: 'relative' }}>
                        <Grid container spacing={8} alignItems="center">
                            <Grid item xs={12} md={6}>
                                <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ 
                                    fontSize: { xs: '2rem', md: '2.8rem' },
                                    color: '#2d3748',
                                    mb: 4
                                }}>
                                    {platformSlides[currentSlide].title}
                                </Typography>
                                <Typography variant="h6" color="text.secondary" sx={{ 
                                    fontSize: '1.3rem',
                                    lineHeight: 1.6
                                }}>
                                    {platformSlides[currentSlide].description}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box sx={{
                                    bgcolor: platformSlides[currentSlide].bgColor,
                                    borderRadius: 4,
                                    height: { xs: 350, md: 450 },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: 3,
                                    transition: 'all 0.3s ease'
                                }}>
                                    {/* <Box sx={{ fontSize: '8rem', mb: 3 }}>
                                        {platformSlides[currentSlide].image}
                                    </Box> */}
                                    {/* <Typography variant="h5" color="text.secondary" fontWeight="600">
                                        {platformSlides[currentSlide].title}
                                    </Typography> */}
                                </Box>
                            </Grid>
                        </Grid>

                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 8 }}>
                            {platformSlides.map((_, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        width: 16,
                                        height: 16,
                                        borderRadius: '50%',
                                        bgcolor: index === currentSlide ? 'secondary.main' : '#ddd',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            bgcolor: index === currentSlide ? 'secondary.main' : '#bbb'
                                        }
                                    }}
                                    onClick={() => setCurrentSlide(index)}
                                />
                            ))}
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Built for Africa Section */}
            <Box sx={{ py: 12, bgcolor: 'primary.main', color: 'white' }}>
                <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6 } }}>
                    <Typography
                        variant="h2"
                        textAlign="center"
                        gutterBottom
                        fontWeight="bold"
                        sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 6 }}
                    >
                        Built for Africa, In Africa
                    </Typography>
                    <Typography
                        variant="h5"
                        textAlign="center"
                        sx={{
                            maxWidth: 1000,
                            mx: 'auto',
                            mb: 8,
                            fontSize: '1.4rem',
                            lineHeight: 1.7,
                            px: { xs: 2, md: 0 }
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
                                borderRadius: 4,
                                px: 6,
                                py: 2.5,
                                borderColor: 'white',
                                color: 'white',
                                fontSize: '1.3rem',
                                textTransform: 'none',
                                borderWidth: 2,
                                '&:hover': {
                                    borderColor: 'white',
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                    borderWidth: 2
                                }
                            }}
                        >
                            Explore the Platform
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* Footer */}
            <Box sx={{ py: 10, bgcolor: '#f8f9fa' }}>
                <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6 } }}>
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
                                <Box sx={{ fontSize: '3rem' }}></Box>
                                <Box
                            component="img"
                            src={lablogos}
                            alt="Healthcare Providers"
                            sx={{
                                width: '100%',
                                maxWidth: 300,
                                height: 'auto',
                                objectFit: 'contain'
                            }}
                        />
                                
                            </Box>
                            <Box sx={{ display: 'flex', gap: 3 }}>
                                <IconButton size="large" sx={{ bgcolor: 'white', boxShadow: 2, width: 50, height: 50 }}>
                                    <LinkedIn />
                                </IconButton>
                                <IconButton size="large" sx={{ bgcolor: 'white', boxShadow: 2, width: 50, height: 50 }}>
                                    <Twitter />
                                </IconButton>
                                <IconButton size="large" sx={{ bgcolor: 'white', boxShadow: 2, width: 50, height: 50 }}>
                                    <Facebook />
                                </IconButton>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                                Quick Links
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Link href="#" color="inherit" underline="none" sx={{ '&:hover': { color: 'primary.main' }, fontSize: '1.1rem' }}>
                                    Home
                                </Link>
                                <Link href="#" color="inherit" underline="none" sx={{ '&:hover': { color: 'primary.main' }, fontSize: '1.1rem' }}>
                                    Research Protocol
                                </Link>
                                <Link href="#" color="inherit" underline="none" sx={{ '&:hover': { color: 'primary.main' }, fontSize: '1.1rem' }}>
                                    Project Team
                                </Link>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                                Contact Info
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Typography variant="h6" color="text.secondary">
                                    Makerere University Kampala
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    +256 701 726 338
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    joyce.nabende@mak.ac.ug
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 8, pt: 6, borderTop: '2px solid #e0e0e0', textAlign: 'center' }}>
                        <Typography variant="h6" color="text.secondary">
                            Copyright © 2025 Mak-AI | Makerere University Kampala
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default LandingPage;