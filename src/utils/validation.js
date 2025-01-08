// Server-side Steam account validation
export const checkSteamAccount = async (steamAccount) => {
  try {
    const formData = new FormData();
    formData.append('steamAccount', steamAccount);
    
    const response = await fetch('https://api.afz.shop/check-steam.php', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    switch (data.code) {
      case 200:
        return null;
      case 400:
        return 'Не хватает данных для запроса, проверьте тело и заголовок';
      case 403:
        return 'По таким данным доступ к этому API запрещен';
      case 404:
        return 'Steam аккаунт не найден или его нельзя пополнить (например, из-за региона)';
      case 500:
        return 'Ошибка со стороны сервера, попробуйте попытку позже или обратитесь в тех. поддержку';
      default:
        return 'Неизвестная ошибка при проверке аккаунта';
    }
  } catch (error) {
    console.error('Steam account check error:', error);
    return 'Ошибка проверки аккаунта';
  }
};