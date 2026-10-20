const configuredApiUrl =
  import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '';
const normalizedApiUrl = configuredApiUrl.trim().replace(/\/+$/, '');
const API_BASE = normalizedApiUrl
  ? /(?:\/api)+$/i.test(normalizedApiUrl)
    ? normalizedApiUrl.replace(/(?:\/api)+$/i, '/api')
    : `${normalizedApiUrl}/api`
  : '/api';

/**
 * Health check query.
 */
export const checkApiHealth = async () => {
  try {
    const res = await fetch(`${API_BASE}/health`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[API] Health check unreachable:', err.message);
    return { success: false, status: 'unreachable' };
  }
};

/**
 * Submit contact form to Express backend -> MongoDB.
 */
export const submitContactForm = async (formData) => {
  let res;
  try {
    res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(formData),
    });
  } catch {
    throw new Error(
      'Could not reach the contact service. Make sure the backend is running.',
    );
  }

  const responseBody = await res.text();
  let data;

  if (responseBody.trim()) {
    try {
      data = JSON.parse(responseBody);
    } catch {
      throw new Error(
        `The contact service returned an unreadable response (HTTP ${res.status}). Check that the backend is running.`,
      );
    }
  } else if (!res.ok && res.status === 503) {
    throw new Error(
      'MongoDB is unavailable. Start the MongoDB service or configure MONGODB_URI, then try again.',
    );
  } else if (!res.ok) {
    throw new Error(
      `The contact service returned no response (HTTP ${res.status}). Check that the backend is running.`,
    );
  } else {
    throw new Error('The contact service returned an empty response. Please try again.');
  }

  if (!res.ok) {
    const errorMsg = Array.isArray(data.errors)
      ? data.errors.join(' ')
      : data.message || 'Submission failed.';
    throw new Error(errorMsg);
  }

  return data;
};

/**
 * Get resume download links through Express API.
 */
export const getResumeDownloadUrl = (type = 'pdf', inline = false) => {
  const extension = type === 'docx' ? 'docx' : 'pdf';
  return `${API_BASE}/resume/${extension}${inline ? '?inline=true' : ''}`;
};
