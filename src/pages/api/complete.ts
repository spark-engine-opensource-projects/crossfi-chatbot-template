import SparkEngineApi from '../../index';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { prompt, projectId } = req.body;

    const sparkEngine = new SparkEngineApi(process.env.SPARK_ENGINE_API_KEY || '');

    const response = await sparkEngine.createCompletion({
      prompt,
      project_id: projectId,
    });

    console.log(response.data)
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching the API response:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
