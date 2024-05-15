const ejecutarConBoton = () => {
    const preference = JSON.parse(localStorage.getItem('preference'));
    createCheckoutButton(preference.id);
  };

  // Asignar la función al evento click del botón
  document.getElementById('miBoton').addEventListener('click', ejecutarConBoton);

  const createCheckoutButton = (preferenceId) => {
    const mp = new MercadoPago('TEST-8fe7da1d-b4b3-48dd-b6f8-71a7eddb91a7', {
      locale: 'es-PE'
    });
    const brickBuilder = mp.bricks();

    const renderComponent = async () => {
      await brickBuilder.create("wallet", "wallet_container", {
        initialization: {
          preferenceId: preferenceId,
        },
      });
    };

    renderComponent();
  };
