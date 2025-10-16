/**
 * Utilidades para manejar localStorage
 */

export const clearParticipantData = () => {
    localStorage.removeItem('participant');
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
    console.log('Participant data cleared from localStorage');
};

export const getParticipantData = () => {
    const participantData = localStorage.getItem('participant');
    if (participantData) {
        try {
            return JSON.parse(participantData);
        } catch (e) {
            console.error('Error parsing participant data:', e);
            return null;
        }
    }
    return null;
};

export const setParticipantData = (participant: any) => {
    localStorage.setItem('participant', JSON.stringify(participant));
    console.log('Participant data saved to localStorage:', participant);
};

export const refreshParticipantData = async (email: string) => {
    try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            throw new Error('No auth token found');
        }

        const response = await fetch(`/api/v1/participants/by-email/${encodeURIComponent(email)}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setParticipantData(data.data);
        return data.data;
    } catch (error) {
        console.error('Error refreshing participant data:', error);
        throw error;
    }
};
