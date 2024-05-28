/*
const ejecutarConBoton = () => {
    const preference = JSON.parse(localStorage.getItem('preference'));
    createCheckoutButton(preference.id);
  };

  document.getElementById('miBoton').addEventListener('click', ejecutarConBoton);

  const createCheckoutButton = (preferenceId) => {
    const mp = new MercadoPago('****', {
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
  */