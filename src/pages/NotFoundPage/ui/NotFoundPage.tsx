import { ErrorScreen } from '../../../widgets/ErrorScreen'

export const NotFoundPage = () => (
    <ErrorScreen
        code="404"
        title={<>Этот зал <em>пуст</em></>}
        text="Такой страницы в нашем кинотеатре нет: возможно, сеанс перенесли или в ссылке опечатка."
        actions={[
            { label: 'На главную', to: '/' },
            { label: 'Схема зала', to: '/demo/hall', variant: 'secondary' },
        ]}
    />
)
