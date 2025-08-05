const baseUrl  = process.env.NEXT_PUBLIC_API_BASEURL || 'https://admin.sourcedhaka.com/api/v2';
const imageBaseUrl = process.env.NEXT_IMAGE_BASE_URL || 'https://admin.sourcedhaka.com/public';
module.exports = {
    baseUrl:baseUrl,
    imageBaseUrl:imageBaseUrl
}