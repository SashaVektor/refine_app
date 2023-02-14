import { useList } from "@pankod/refine-core"
import {
    PieChart, PropertyReferrals, TotalRevenue,
    PropertyCard, TopAgent
} from "components"
import { Typography, Box, Stack } from "@pankod/refine-mui"

const Home = () => {
    const {data, isLoading, isError} = useList({
        resource: "properties",
        config: {
            pagination: {
                pageSize: 4
            }
        }
    })

    const latestProperties = data?.data ?? [];

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error...</div>
    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Dashboard
            </Typography>
            <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
                <PieChart
                    title="Properties for Sale"
                    value={684}
                    series={[75, 25]}
                    colors={["#475ae8", "#e4b8ef"]}
                />
                <PieChart
                    title="Properties for Rent"
                    value={550}
                    series={[60, 20]}
                    colors={["#475ae8", "#e4b8ef"]}
                />
                <PieChart
                    title="Total Customers"
                    value={5684}
                    series={[75, 25]}
                    colors={["#475ae8", "#e4b8ef"]}
                />
                <PieChart
                    title="Total for Cities"
                    value={5}
                    series={[75, 25]}
                    colors={["#475ae8", "#e4b8ef"]}
                />
            </Box>
            <Stack mt="25px" width="100%" direction={{ xs: "column", lg: "row" }} gap={2}>
                <TotalRevenue />
                <PropertyReferrals />
            </Stack>
            <Box
                flex={1}
                borderRadius="15px"
                padding="20px"
                bgcolor="#fcfcfc"
                display="flex"
                flexDirection="column"
                minWidth="100%"
                mt="25px"
            >
                <Typography fontSize="18px" fontWeight={600} color="#11142d">
                    Latest Properties
                </Typography>
                <Box mt={2.5} sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 4
                }}>
                    {latestProperties.map((prop) => (
                        <PropertyCard 
                        key={prop._id}
                        id={prop._id}
                        title={prop.title}
                        location={prop.location}
                        price={prop.price}
                        photo={prop.photo}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default Home
