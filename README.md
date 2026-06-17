# Rasp Automação

> Soluções Inteligentes em Automação Industrial e Engenharia Elétrica. Uma empresa em conexão com sua automação.

Este repositório contém a página web institucional e interativa da **Rasp Automação**, projetada com arquitetura moderna e focada na experiência do usuário (UX/UI premium), apresentando os serviços e o portfólio de engenharia elétrica da empresa.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias web puras (stack estática) para garantir máxima velocidade de carregamento, responsividade e facilidade de deploy:

- **HTML5 Semântico:** Estruturação organizada e otimizada para SEO e acessibilidade.
- **CSS3 Customizado (Vanilla):** Estilização baseada em variáveis CSS (Design System), efeitos de transição fluidos, glassmorphism e responsividade completa (Mobile, Tablet, Desktop).
- **JavaScript Moderno (ES6+):** Funcionalidades dinâmicas do front-end, incluindo:
  - Controle dinâmico do Header ao rolar a página.
  - Menu responsivo mobile.
  - Carrossel infinito de marcas parceiras.
  - Galeria de fotos de projetos com filtros dinâmicos e Lightbox integrado para navegação por teclado/cliques.
  - Modais interativos com informações detalhadas de cada serviço.
  - Máscara dinâmica no campo de telefone e validação robusta no formulário de contato.
  - Slideshow dinâmico automático com efeito parallax na seção Hero.
- **Font Awesome (v6.4.0):** Conjunto completo de ícones vetoriais.

---

## 📁 Estrutura de Pastas

```text
├── assets/                  # Ativos estáticos do projeto
│   ├── css/
│   │   └── style.css        # Estilos customizados e variáveis globais
│   ├── img/                 # Imagens ilustrativas e fotos reais de painéis/projetos
│   └── js/
│       └── main.js          # Scripts e interatividades em JS puro
├── .env.example             # Modelo de variáveis de ambiente para futuras migrações
├── .gitignore               # Configurações de arquivos ignorados no versionamento
├── index.html               # Página principal da aplicação
├── README.md                # Documentação técnica do projeto
└── setup_github.ps1         # Script PowerShell para conexão com o repositório remoto
```

---

## 🔒 Segurança & Variáveis de Ambiente

O projeto foi auditado contra chaves criptográficas de API, credenciais de bancos de dados ou senhas hardcoded. 
Caso o projeto seja migrado para uma stack com servidor backend ativo (como Node.js, PHP avançado, etc.), utilize o arquivo `.env.example` como guia:

1. Duplique o arquivo `.env.example` e renomeie-o para `.env`
2. Configure suas credenciais e chaves nas variáveis definidas
3. Nunca comite o arquivo `.env` gerado (ele já está devidamente ignorado no `.gitignore`).

---

## 🚀 Como Executar Localmente

Como se trata de um site estático, basta abrir o arquivo `index.html` em qualquer navegador web de sua preferência.

Alternativamente, se você deseja rodar um servidor de desenvolvimento local leve utilizando o Python (já instalado na maioria dos ambientes):

```bash
# Executa um servidor local na porta 8000
python -m http.server 8000
```
Depois, acesse no seu navegador: `http://localhost:8000`.

---

## 📦 Como Publicar no GitHub

Se você está configurando este repositório pela primeira vez e precisa associá-lo ao GitHub remoto:

### No Windows (PowerShell):
1. Certifique-se de que possui as credenciais de acesso configuradas no Git.
2. Abra o terminal na pasta do projeto e execute o script fornecido:
   ```powershell
   PowerShell -ExecutionPolicy Bypass -File .\setup_github.ps1
   ```

### Em Outros Sistemas (Linux / macOS):
Execute os seguintes comandos Git manualmente no seu terminal na raiz do projeto:
```bash
# 1. Altera o branch padrão para main
git branch -M main

# 2. Associa o repositório remoto oficial
git remote add origin https://github.com/SamaraAlexandria26/Rasp-Automa-o.git

# 3. Envia os arquivos locais para o GitHub
git push -u origin main
```

---

## 📄 Licença

Este projeto é de propriedade intelectual exclusiva da **Rasp Automação**. Todos os direitos reservados.
