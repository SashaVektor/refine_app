import { Typography, Box, Stack } from "@pankod/refine-mui"
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core"
import { useParams, useNavigate } from "@pankod/refine-react-router-v6"
import { ChatBubble, Delete, Edit, Phone, Place, Star } from "@mui/icons-material"
import { CustomButton } from "components"

function checkImage(url: any) {
  const img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const PropertyDetails = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const { id } = useParams();
  const { mutate } = useDelete();
  const { queryResult } = useShow();

  const { data, isLoading, isError } = queryResult;
  const propertyDetails = data?.data ?? {};

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  const isCurrentUser = user.email === propertyDetails.creator.email;

  const handleDeleteProperty = () => {
    // eslint-disable-next-line no-restricted-globals
    const response = confirm("Are you sure you want to delete this property?")
    if (response) {
      mutate({
        resource: "properties",
        id: id as string
      }, {
        onSuccess: () => {
          navigate("/properties")
        }
      })

    }
  }
  return (
    <Box
      borderRadius="15px"
      padding="20px"
      bgcolor="#fcfcfc"
      width="fit-content"
    >
      <Typography
        fontSize={25}
        fontWeight={700}
        color="#11142d"
      >
        Details
      </Typography>
      <Box mt="20px" display="flex" flexDirection={{ xs: "column", lg: "row" }} gap={4}>
        <Box flex={1} maxWidth={764}>
          <img src={propertyDetails.photo} alt={propertyDetails.title} height={546}
            style={{
              objectFit: "cover", borderRadius: "10px"
            }}
            className="property_details-img"
          />
          <Box mt="15px">
            <Stack direction="row" justifyContent="space-between" flexWrap="wrap" alignItems="center">
              <Typography fontSize={18} fontWeight={500} color="#11142d" textTransform="capitalize">
                {propertyDetails.propertyType}
              </Typography>
              <Box>
                {[1, 2, 3, 4, 5].map((star) => <Star key={`star-${star}`} sx={{
                  color: "#f2c94c"
                }} />)}
              </Box>
            </Stack>
            <Stack direction="row" justifyContent="space-between" flexWrap="wrap" alignItems="center">
              <Box>
                <Typography fontSize={22} fontWeight={700} color="#11142d" textTransform="capitalize">
                  {propertyDetails.title}
                </Typography>
                <Stack mt={0.5} direction="row" alignItems="center" gap={0.5}>
                  <Place sx={{ color: "#808191" }} />
                  <Typography fontSize={14} color="#808191">
                    {propertyDetails.location}
                  </Typography>
                </Stack>
              </Box>
              <Box>
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  mt="10px"
                  color="#11142D"
                >
                  Price
                </Typography>
                <Stack
                  direction="row"
                  alignItems="flex-end"
                  gap={1}
                >
                  <Typography
                    fontSize={25}
                    fontWeight={700}
                    color="#475BE8"
                  >
                    ${propertyDetails.price}
                  </Typography>
                  <Typography
                    fontSize={14}
                    color="#808191"
                    mb={0.5}
                  >
                    for one day
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            <Stack mt="25px" direction="column" gap="10px">
              <Typography fontSize={18} color="#11142D">
                Description
              </Typography>
              <Typography fontSize={14} color="#808191">
                {propertyDetails.description}
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Box
          width="100%"
          flex={1}
          maxWidth={326}
          display="flex"
          flexDirection="column"
          gap="20px"
        >
          <Stack
            width="100%"
            p={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
            border="1px solid #E4E4E4"
            borderRadius={2}
          >
            <Stack
              mt={2}
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <img
                src={
                  checkImage(propertyDetails.creator.avatar)
                    ? propertyDetails.creator.avatar
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                }
                alt="avatar"
                width={90}
                height={90}
                style={{
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
              />

              <Box mt="15px">
                <Typography
                  fontSize={18}
                  fontWeight={600}
                  color="#11142D"
                >
                  {propertyDetails.creator.name}
                </Typography>
                <Typography
                  mt="5px"
                  fontSize={14}
                  fontWeight={400}
                  color="#808191"
                >
                  Agent
                </Typography>
              </Box>

              <Stack
                mt="15px"
                direction="row"
                alignItems="center"
                gap={1}
              >
                <Place sx={{ color: "#808191" }} />
                <Typography
                  fontSize={14}
                  fontWeight={400}
                  color="#808191"
                >
                  North Carolina, USA
                </Typography>
              </Stack>

              <Typography
                mt={1}
                fontSize={16}
                fontWeight={600}
                color="#11142D"
              >
                {propertyDetails.creator.allProperties.length}{" "}
                Properties
              </Typography>
            </Stack>

            <Stack
              width="100%"
              mt="25px"
              direction="row"
              flexWrap="wrap"
              gap={2}
            >
              <CustomButton
                title={!isCurrentUser ? "Message" : "Edit"}
                backgroundColor="#475BE8"
                color="#FCFCFC"
                fullWidth
                icon={
                  !isCurrentUser ? <ChatBubble /> : <Edit />
                }
                handleClick={() => {
                  if (isCurrentUser) {
                    navigate(
                      `/properties/edit/${propertyDetails._id}`,
                    );
                  }
                }}
              />
              <CustomButton
                title={!isCurrentUser ? "Call" : "Delete"}
                backgroundColor={
                  !isCurrentUser ? "#2ED480" : "#d42e2e"
                }
                color="#FCFCFC"
                fullWidth
                icon={!isCurrentUser ? <Phone /> : <Delete />}
                handleClick={() => {
                  if (isCurrentUser) handleDeleteProperty();
                }}
              />
            </Stack>
          </Stack>

          <Stack>
            <img
              src="data:image/jpeg;base64,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"
              width="100%"
              height={306}
              style={{ borderRadius: 10, objectFit: "cover" }}
            />
          </Stack>

          <Box>
            <CustomButton
              title="Book Now"
              backgroundColor="#475BE8"
              color="#FCFCFC"
              fullWidth
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default PropertyDetails
