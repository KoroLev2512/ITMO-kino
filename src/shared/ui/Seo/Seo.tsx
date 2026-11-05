import { Helmet } from 'react-helmet-async';

export const SITE_NAME = 'ИТМО КИНО';

interface SeoProps {
    title?: string;
    noindex?: boolean;
}

/**
 * Per-route head overrides. Default description, canonical, Open Graph and JSON-LD
 * are static in public/index.html so crawlers and link previews see them without JS.
 * Only set what differs per route here, otherwise tags get duplicated.
 */
export const Seo = ({ title, noindex }: SeoProps) => (
    <Helmet>
        <title>{title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — показ студенческих фильмов ИТМО`}</title>
        {noindex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
);
