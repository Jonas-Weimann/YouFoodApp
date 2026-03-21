import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import { env } from "../src/config/env.js"

const supabase = createClient(
    env.SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY
);

export const subirASupabase = async (pathLocal, nombreArchivo) => {
    try {
        const fileBuffer = fs.readFileSync(pathLocal)

        const { data, error } = await supabase.storage
            .from('reportes_pdf')
            .upload(nombreArchivo, fileBuffer, {
                contentType: 'application/pdf',
                upsert: true
            });

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
            .from('reportes_pdf')
            .getPublicUrl(nombreArchivo)

        fs.unlinkSync(pathLocal)

        return publicUrl

    } catch (error) {
        console.error("Error en Supabase Storage:", error.message)
        throw error;
    }
};