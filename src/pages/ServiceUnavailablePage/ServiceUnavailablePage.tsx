import { ErrorScreen } from '../../widgets/ErrorScreen'

/** Shown at /503 and in place of pages whose API request failed (backend down). */
export const ServiceUnavailablePage = () => (
    <ErrorScreen
        code="503"
        title={<>Технический <em>перерыв</em></>}
        text="Киномеханик меняет плёнку — сервис временно недоступен. Попробуйте обновить страницу через пару минут."
        actions={[
            { label: 'Обновить', onClick: () => window.location.reload() },
            { label: 'На главную', to: '/', variant: 'secondary' },
        ]}
    />
)
