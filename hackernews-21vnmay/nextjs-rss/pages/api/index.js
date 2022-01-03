export const request = async (endpoint, body) => {
  console.log('url', `${process.env.NEXT_PUBLIC_API_URL}${endpoint}?token=${process.env.NEXT_PUBLIC_TOKEN}`)
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}?token=${process.env.NEXT_PUBLIC_TOKEN}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`❌ + ${error}`);
    return {};
  }
};

export const getArticles = () => request('/articles');