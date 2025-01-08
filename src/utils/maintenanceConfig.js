const getMaintenanceStatus = async () => {
  try {
    // Add cache-busting query parameter
    const response = await fetch(`/maintenance.json?_=${Date.now()}`);
    if (!response.ok) return false;
    const data = await response.json();
    return data.maintenanceMode === true;
  } catch (error) {
    console.info('Could not get maintenance status:', error.message);
    return false;
  }
};

const setMaintenanceStatus = async () => {
  try {
    const currentStatus = await getMaintenanceStatus();
    const newStatus = !currentStatus;
    
    const response = await fetch('/switcher.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `status=${newStatus}`
    });

    if (!response.ok) {
      throw new Error('Failed to update maintenance status');
    }

    return newStatus;
  } catch (error) {
    console.error('Could not update maintenance status:', error.message);
    throw new Error('Не удалось обновить статус обслуживания');
  }
};

export { getMaintenanceStatus, setMaintenanceStatus };