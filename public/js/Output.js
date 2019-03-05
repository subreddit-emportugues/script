/**
 * Usado pelos objetos que representam as views para exibir dados para o usuário.
 */
class Output {

    /**
     * Altera o indicador de estado do crawler.
     * @param {String} state - O estado do crawler.
     */
    setState(state) {
        this.setHtml('#status', `Estado: <b>${state}</b>`)
    }

    /**
     * Remove todas as entradas da tabela.
     */
    resetTable() {
        this.setHtml('#table tbody', '')
    }

    /**
     * Reduz a barra de progresso para 0.
     */
    resetProgressBar() {
        this.setCss('#progress-bar', 'width', 0);
    }

    /**
     * Mostra ou oculta o botão especificado.
     * @param {String} element - O nome do botão.
     * @param {Boolean} show - O valor que indica se o botão deve ser mostrado ou ocultado.
     */
    displayButton(element, show) {
        if (show) {
            this.setCss(`#${element}-button`, 'display', 'block');
        } else {
            this.setCss(`#${element}-button`, 'display', 'none');
        }
    }

    /**
     * Converte o tempo do formato UNIX para o formato legível para humanos.
     * @param {Number} unixTimestamp - O tempo no formato UNIX.
     * @return {String} Uma data no formato dd/mm/aaaa.
     */
    static convertUnixTimestamp(unixTimestamp){
        const date = new Date(unixTimestamp * 1000);
        const year = date.getFullYear();
        const month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
        const day = (date.getDate() < 10 ? '0' : '') + date.getDate();
        const time = day + '/' + month + '/' + year;
        return time;
    }

    /**
     * Ativa os controles de exibição e ordenação da tabela.
     */
    enableTableControls() {
        this.setHtml('#subs-sc .arrow', '▾');
        this.setCss('#table th p', 'cursor', 'pointer');
        this.setCss('.checkbox', 'display', 'inline');
    }

    /**
     * Adiciona um subreddit ao começo da tabela.
     * @param {Subreddit} subreddit - O subreddit que vai ser adicionado.
     */
    prependRowtoTable(subreddit) {
        $('#table tbody').prepend(this.getPreviewTableRowFormat(subreddit));
    }

    /**
     * Adiciona um subreddit ao final da tabela.
     * @param {Subreddit} subreddit - O subreddit que vai ser adicionado.
     */
    appendRowtoTable(subreddit) {
        $('#table tbody').append(this.getPreviewTableRowFormat(subreddit));
    }

    /**
     * Obtém os dados do subreddit especificado com a formatação da tabela de pré-visualização.
     * @param {Subreddit} subreddit - O subreddit que vai ser formatado.
     * @return {String} Os dados do subreddit formatados.
     */
    getPreviewTableRowFormat(subreddit) {
        return `
        <tr>
        <td><img src="${subreddit.getIcon("preview")}" width="20" height="20"></td>
        <td>${subreddit.getName("preview")}</td>
        <td>${subreddit.getSubscribers("preview")}</td>
        <td>${subreddit.getCreated("preview")}</td>
        <td>${subreddit.getNsfw("preview")}</td>
        <td>${subreddit.getDescription("preview")}</td>
        </tr>
        `;  
    }

    /**
     * Alterna as cores de fundo das linhas da tabela, causando a impressão de rolagem.
     * @param {ProgressBar} progress - O progresso atual do crawler.
     */
    scrollTable(progress) {
        if (progress % 2 == 0) {
            this.setCss('table tbody tr:nth-child(even)', 'background-color', '#dddddd');
            this.setCss('table tbody tr:nth-child(odd)', 'background-color', '#f8f8f8');
        } else {
            this.setCss('table tbody tr:nth-child(even)', 'background-color', '#f8f8f8');
            this.setCss('table tbody tr:nth-child(odd)', 'background-color', '#dddddd');
        }
    }

    /**
     * Exibe uma mensagem na barra de notificação.
     * @param {String} message - A mensagem que vai ser exibida.
     */
    notify(message) {
        this.setHtml('#notification-bar', message);
        $('#notification-bar').slideDown('fast');
        window.setTimeout(this.closeNotification, 3000);
    }

    /**
     * Fecha a barra de notificação.
     */
    closeNotification() {
        $('#notification-bar').slideUp('fast');
    }

    /**
     * Altera o tamanho da barra de progresso.
     * @param {Number} width - A largura que a barra de progresso vai ter.
     */
    increaseProgressBar(width) {
        this.setCss('#progress-bar', 'width', width);
    }

    /**
     * Altera o indicador de progresso do crawler.
     * @param {ProgressBar} progress - O progresso atual do crawler.
     */
    setProgress(progress) {
        this.setHtml("#status", `Progresso: <b>${progress}</b>`);
    }

    /**
     * Altera o texto do botão de pausa.
     * @param {Boolean} state - O valor que indica qual texto o botão de pausa deve ter.
     */
    setPauseButtonState(state) {
        if (state) {
            this.setHtml('#pause-button', 'Continuar');
        } else {
            this.setHtml('#pause-button', 'Pausar');
        }
    }

    /**
     * Remove o indicador de ordenação de uma coluna da tabela de pré-visualização.
     * @param {Column} column - A coluna da tabela.
     */
    removeColumnArrow(column) {
        this.setHtml(column, Input.getHtml(column).replace(/▾|▴/g, ''));
    }

    /**
     * Adiciona o indicador de ordenação a uma coluna da tabela de pré-visualização.
     * @param {Column} column - A coluna da tabela.
     */
    addColumnArrow(column) {
        this.setHtml(column, Input.getHtml(column) + ' ▾');
    }

    /**
     * Inverte o indicador de ordenação da tabela de pré-visualização.
     * @param {Column} column - A coluna da tabela.
     * @param {Boolean} ascending - Valor que determina se o indicador de ordenação deve estar para cima ou para baixo.
     */
    reverseColumnArrow(column, ascending) {
        this.removeColumnArrow(column);

        if (ascending) {
            this.setHtml(column, Input.getHtml(column) + ' ▴');
        } else {
            this.setHtml(column, Input.getHtml(column) + ' ▾');
        }
    }

    /**
     * Altera o valor de um atributo CSS do elemento especificado.
     * @param {Element} element - O elemento que terá o css alterado.
     * @param {String} attribute - O atributo do elemento.
     * @param {String} value - O valor do atributo.
     */
    setCss(element, attribute, value) {
        $(element).css(attribute, value);
    }

    /**
     * Altera o conteúdo HTML de um elemento.
     * @param {Element} element - O elemento que terá o HTML alterado.
     * @param {String} value - O conteúdo HTML.
     */
    setHtml(element, value) {
        $(element).html(value);
    }
}