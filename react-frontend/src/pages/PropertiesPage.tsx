import { useEffect, useState } from "react"
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Chip,
    CircularProgress,
} from "@mui/material"
import { getAllProperties } from "../api/propertyApi"

interface Property {
    property_id: number
    property_title: string
    property_description: string
    price: number
    bedrooms: number
    bathrooms: number
    area_sqft: number
    address: string
    city: string
    property_images: string[]
    property_status: string
    category_name: string
    furnished: boolean
    has_garden: boolean
    has_pool: boolean
}

export default function PropertiesPage() {
    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const data = await getAllProperties()
                setProperties(data.data)
            } catch (error) {
                console.error("Error fetching properties:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchProperties()
    }, [])

    if (loading) {
        return (
            <Box
                height="100vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Container sx={{ py: 6 }}>
            <Typography variant="h4" fontWeight="bold" mb={5}>
                Available Properties
            </Typography>

            <Grid container spacing={4}>
                {properties.map((property) => (
                    <Grid item xs={12} sm={6} md={4} key={property.property_id}>
                        <Card
                            sx={{
                                borderRadius: "20px",
                                overflow: "hidden",
                                transition: "0.3s",
                                boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                                "&:hover": {
                                    transform: "translateY(-6px)",
                                    boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
                                },
                            }}
                        >
                            {/* Image */}
                            <CardMedia
                                component="img"
                                height="220"
                                image={`http://127.0.0.1:8000${property.property_images[0]}`}
                                alt={property.property_title}
                            />

                            <CardContent>
                                {/* Title */}
                                <Typography variant="h6" fontWeight="bold">
                                    {property.property_title}
                                </Typography>

                                {/* Location */}
                                <Typography variant="body2" color="text.secondary">
                                    {property.address}, {property.city}
                                </Typography>

                                {/* Features */}
                                <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                                    <Chip label={`${property.bedrooms} Beds`} size="small" />
                                    <Chip label={`${property.bathrooms} Baths`} size="small" />
                                    <Chip label={`${property.area_sqft} sqft`} size="small" />
                                </Box>

                                {/* Extra Features */}
                                <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                                    {property.furnished && (
                                        <Chip label="Furnished" size="small" color="success" />
                                    )}
                                    {property.has_garden && (
                                        <Chip label="Garden" size="small" color="success" />
                                    )}
                                    {property.has_pool && (
                                        <Chip label="Pool" size="small" color="success" />
                                    )}
                                </Box>

                                {/* Price */}
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    color="primary"
                                    mt={2}
                                >
                                    ₹ {property.price.toLocaleString()}
                                </Typography>

                                {/* Category */}
                                <Chip
                                    label={property.category_name}
                                    size="small"
                                    color="secondary"
                                    sx={{ mt: 1 }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}