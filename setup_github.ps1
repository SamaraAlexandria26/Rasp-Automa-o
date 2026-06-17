# Script de configuração do repositório remoto e push no GitHub
# Projeto: Rasp Automação

# URL do Repositório Remoto fornecido pelo usuário
$remoteUrl = "https://github.com/SamaraAlexandria26/Rasp-Automa-o.git"

Write-Host "Iniciando a configuração do repositório remoto do GitHub..." -ForegroundColor Cyan

# 1. Renomeia o branch principal para main (boa prática)
Write-Host "Definindo o branch padrão como 'main'..." -ForegroundColor Gray
git branch -M main

# 2. Configura ou atualiza o repositório remoto 'origin'
$existingRemotes = git remote

if ($existingRemotes -contains "origin") {
    Write-Host "Repositório remoto 'origin' já existe. Atualizando URL..." -ForegroundColor Yellow
    git remote set-url origin $remoteUrl
} else {
    Write-Host "Adicionando repositório remoto 'origin'..." -ForegroundColor Gray
    git remote add origin $remoteUrl
}

# 3. Exibe o status atual do remote
Write-Host "Repositórios remotos configurados:" -ForegroundColor Gray
git remote -v

# 4. Orientações finais
Write-Host ""
Write-Host "Configuração concluída com sucesso!" -ForegroundColor Green
Write-Host "Para enviar suas alterações para o GitHub, execute:" -ForegroundColor Green
Write-Host "git push -u origin main" -ForegroundColor Yellow
Write-Host "(Se ocorrer algum erro de autenticação, verifique suas credenciais e permissões no GitHub)" -ForegroundColor Gray
Write-Host ""
