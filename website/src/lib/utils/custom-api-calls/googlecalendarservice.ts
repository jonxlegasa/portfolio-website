import axiosInstance from "../axiosinstance";

export class GoogleCalendarService {
  static async auth(token: string): Promise<{ authorizationUrl: string, statusCode: number }> {
    const response: any = await axiosInstance.get('/google_calendar/auth', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });



    return {
      authorizationUrl: response.data,
      statusCode: response.status
    }
  }
  static async oauth2Callback(): Promise<void> {
    await axiosInstance.get('/google_calendar/oauth2callback');
  }

  static async listEvents(token: string, calendarId: string): Promise<any> {
    const response = await axiosInstance.get(`/google_calendar/events/${calendarId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return response.data;
  }

  static async createEvent(token: string, calendarId: string, eventData: any): Promise<any> {
    const response = await axiosInstance.post(`/google_calendar/events/create_event/${calendarId}`, eventData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  }

  static async getEvent(token: string, calendarId: string, eventId: string): Promise<any> {
    const response = await axiosInstance.get(`/google_calendar/events/${calendarId}/${eventId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return response.data;
  }

  static async updateEvent(token: string, calendarId: string, eventId: string, eventData: any): Promise<any> {
    const response = await axiosInstance.put(`/google_calendar/events/${calendarId}/${eventId}`, eventData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  }

  static async deleteEvent(token: string, calendarId: string, eventId: string): Promise<void> {
    await axiosInstance.delete(`/google_calendar/events/${calendarId}/${eventId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  static async importEvent(token: string, calendarId: string, eventData: any): Promise<any> {
    const response = await axiosInstance.post(`/google_calendar/events/import_event/${calendarId}`, eventData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  }

  static async moveEvent(token: string, eventId: string, sourceCalendarId: string, destinationCalendarId: string): Promise<any> {
    const response = await axiosInstance.post(`/google_calendar/events/move_event/${eventId}`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        source_calendar_id: sourceCalendarId,
        destination_calendar_id: destinationCalendarId
      }
    });

    return response.data;
  }

  static async watchEvents(token: string, channelId: string, channelType: string, channelAddress: string, calendarId: string): Promise<any> {
    const response = await axiosInstance.post('/google_calendar/events/watch_events', null, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        channel_id: channelId,
        channel_type: channelType,
        channel_address: channelAddress,
        calendar_id: calendarId
      }
    });

    return response.data;
  }
}
