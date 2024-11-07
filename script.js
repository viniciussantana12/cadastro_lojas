const inputs = document.querySelectorAll('input');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                input.style.border = '2px solid purple'; 
            });

            input.addEventListener('blur', function() {
                input.style.border = '1px solid black'; 
            });

            input.addEventListener('input', function() {
                localStorage.setItem(input.id, input.value); 
            });
        });

        function restaurarDados() {
            inputs.forEach(input => {
                if (localStorage.getItem(input.id)) {
                    input.value = localStorage.getItem(input.id);
                }
            });
        }

        window.onload = restaurarDados;

        const formulario = document.getElementById('formulario');

        formulario.addEventListener('submit', function(event) {
            event.preventDefault(); 
            console.log('Preparando envio...');

            const dados = {
                nome: document.getElementById('nome').value,
                endereco: document.getElementById('endereco').value,
                dias: {
                    segunda: document.getElementById('segunda').checked,
                    terca: document.getElementById('terca').checked,
                    quarta: document.getElementById('quarta').checked,
                    quinta: document.getElementById('quinta').checked,
                    sexta: document.getElementById('sexta').checked
                },
                abertura: document.getElementById('opening-time').value,
                fechamento: document.getElementById('closing-time').value
            };

            console.log(dados); 

            fetch('https://api.flit.com.br/submeterDados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
            })
            .then(response => response.json())
            .then(data => console.log('Sucesso:', data))
            .catch((error) => console.error('Erro ao enviar:', error));
        });