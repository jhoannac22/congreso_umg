/**
 * Diploma API functions
 */

import { apiClient } from './api-client';

export interface Diploma {
    id: number;
    participant_id: number;
    activity_id: number;
    diploma_number: string;
    template_type: 'participation' | 'winner' | 'special';
    pdf_path: string;
    issue_date: string;
    is_sent: boolean;
    sent_at: string | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
    activity?: {
        id: number;
        name: string;
        description: string;
        type: string;
    };
    participant?: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
    };
}

export interface DiplomaResponse {
    message: string;
    data: Diploma | Diploma[];
}

/**
 * Get all diplomas (admin)
 */
export async function getDiplomas(params?: {
    participant_id?: number;
    activity_id?: number;
    template_type?: string;
    sent?: boolean;
    date_from?: string;
    date_to?: string;
}): Promise<DiplomaResponse> {
    const response = await apiClient.get('/v1/diplomas', { params });
    return response.data;
}

/**
 * Get a single diploma
 */
export async function getDiploma(id: number): Promise<DiplomaResponse> {
    const response = await apiClient.get(`/v1/diplomas/${id}`);
    return response.data;
}

/**
 * Get participant's diplomas
 */
export async function getParticipantDiplomas(participantId: number): Promise<DiplomaResponse> {
    const response = await apiClient.get(`/v1/participants/${participantId}/diplomas`);
    return response.data;
}

/**
 * Generate diploma for participant and activity
 */
export async function generateDiploma(
    participantId: number,
    activityId: number
): Promise<DiplomaResponse> {
    const response = await apiClient.post(`/v1/diplomas/generate/${participantId}/${activityId}`);
    return response.data;
}

/**
 * Create a new diploma
 */
export async function createDiploma(data: {
    participant_id: number;
    activity_id: number;
    template_type: 'participation' | 'winner' | 'special';
    issue_date: string;
    notes?: string;
}): Promise<DiplomaResponse> {
    const response = await apiClient.post('/v1/diplomas', data);
    return response.data;
}

/**
 * Update a diploma
 */
export async function updateDiploma(
    id: number,
    data: Partial<{
        template_type: 'participation' | 'winner' | 'special';
        issue_date: string;
        notes: string;
    }>
): Promise<DiplomaResponse> {
    const response = await apiClient.put(`/v1/diplomas/${id}`, data);
    return response.data;
}

/**
 * Delete a diploma
 */
export async function deleteDiploma(id: number): Promise<DiplomaResponse> {
    const response = await apiClient.delete(`/v1/diplomas/${id}`);
    return response.data;
}

/**
 * Download diploma PDF
 */
export async function downloadDiploma(id: number, diplomaNumber: string): Promise<void> {
    try {
        const response = await apiClient.get(`/v1/diplomas/download/${id}`, {
            responseType: 'blob',
        });

        // Create a blob link to download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Diploma_${diplomaNumber}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading diploma:', error);
        throw error;
    }
}

/**
 * Send diploma by email
 */
export async function sendDiplomaByEmail(id: number): Promise<DiplomaResponse> {
    const response = await apiClient.post(`/v1/diplomas/${id}/send-email`);
    return response.data;
}

/**
 * Generate diplomas in bulk for an activity (admin)
 */
export async function generateBulkDiplomas(
    activityId: number,
    data?: {
        template_type?: 'participation' | 'winner' | 'special';
        issue_date?: string;
    }
): Promise<{
    message: string;
    data: {
        generated: number;
        skipped: number;
        errors: string[];
        total_participants: number;
    };
}> {
    const response = await apiClient.post(
        `/v1/admin/activities/${activityId}/generate-diplomas`,
        data
    );
    return response.data;
}

/**
 * Get diploma statistics (admin)
 */
export async function getDiplomaStats(): Promise<{
    message: string;
    data: {
        total: number;
        sent: number;
        pending: number;
        by_type: {
            participation: number;
            winner: number;
            special: number;
        };
        recent: Diploma[];
    };
}> {
    const response = await apiClient.get('/v1/admin/diplomas/stats');
    return response.data;
}

/**
 * Send bulk emails (admin)
 */
export async function sendBulkEmails(diplomaIds: number[]): Promise<{
    message: string;
    data: {
        sent: number;
        errors: string[];
        total: number;
    };
}> {
    const response = await apiClient.post('/v1/admin/diplomas/send-bulk-emails', {
        diploma_ids: diplomaIds
    });
    return response.data;
}

