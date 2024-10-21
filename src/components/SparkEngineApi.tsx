import axios from 'axios';

interface CompletionRequest {
  prompt: string;
  project_id?: string;
}

interface CompletionResponse {
  data: any;
}

class SparkEngineApi {
  apiKey: string;
  baseUrl: string;

  constructor(apiKey: string, baseUrl = "https://sparkengine.ai/api/engine/completion") {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async createCompletion({ prompt, project_id }: CompletionRequest): Promise<CompletionResponse> {
    try {
      const response = await axios.post(this.baseUrl, {
        api_key: this.apiKey,
        project_id: project_id || 'default-project-id',
        prompt,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return { data: response.data };
    } catch (error) {
      throw new Error(`Error fetching data: ${error}`);
    }
  }
}

export default SparkEngineApi;