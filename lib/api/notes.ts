import axios from "axios";
import type {Note, NewNote} from "@/types/note"


const BASE_URL = "https://notehub-public.goit.study/api/notes";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN}` },
});


export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}


export const fetchNotes = async (params?: FetchNotesParams) => {
  const queryParams: Record<string, string | number> = {};

  if (params?.tag && params.tag !== "all") {
    queryParams.tag = params.tag;
  }
  if (params?.page) {
    queryParams.page = params.page;
  }
  if (params?.perPage) {
    queryParams.perPage = params.perPage;
  }

  if (params?.search) {
    queryParams.search = params.search;
  }

  const response = await api.get<FetchNotesResponse>("", {
    params: queryParams,
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/${id}`);
  return response.data;
};

export const createNote = async (note: NewNote): Promise<Note> => {
  const response = await api.post<Note>("", note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/${id}`);
  return response.data;
};


