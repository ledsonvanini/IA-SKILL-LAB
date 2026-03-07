# Módulo: Autenticação

> Login via Google OAuth com roles diferenciados (admin vs customer).

## Responsabilidade

Autenticação via Google Identity Services, gerenciamento de sessão, controle de acesso por role (admin/customer) e guard de rotas protegidas.

## Estrutura

```
auth/
├── domain/
│   ├── entities/         → User, Session
│   └── value-objects/    → UserRole (admin | customer)
├── application/
│   └── use-cases/        → LoginWithGoogle, Logout, GetCurrentUser, CheckPermission
├── infrastructure/
│   └── repositories/     → SupabaseAuthRepository (futuro)
├── presentation/
│   └── components/       → LoginButton, AuthGuard, UserAvatar
└── __tests__/            → Testes co-localizados por camada
```

## Dependências

- Nenhuma dependência interna (módulo raiz)
```

