// script.js

document.addEventListener('DOMContentLoaded', () => {
    // お悩み解決項目 の切り替え処理
    const problemTabs = document.querySelectorAll('.problem-tab');
    const problemContents = document.querySelectorAll('.problem-content');

    problemTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 現在アクティブなタブとコンテンツからactiveクラスを削除
            document.querySelector('.problem-tab.active')?.classList.remove('active');
            document.querySelector('.problem-content.active')?.classList.remove('active');

            // クリックされたタブをアクティブにする
            tab.classList.add('active');

            // 対応するコンテンツをアクティブにする
            const targetTabId = tab.dataset.tab; // data-tab属性からIDを取得
            const targetContent = document.getElementById(targetTabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // 初期表示として、最初のタブとコンテンツをアクティブにする
    if (problemTabs.length > 0 && problemContents.length > 0) {
        problemTabs[0].classList.add('active');
        problemContents[0].classList.add('active');
    }

    // よくある質問 (FAQ) のアコーディオン処理
    const faqItems = document.querySelectorAll('.faq-item');

    // 画面幅に関わらず、すべて閉じた状態にするための関数
    const setupFaqToggle = () => {
        faqItems.forEach(item => {
            const question = item.querySelector('.question');
            const answer = item.querySelector('.answer');

            // クリックイベントリスナーがまだ追加されていない場合のみ追加
            if (!question.dataset.listenerAdded) { // 既にリスナーが追加されているかチェック
                question.addEventListener('click', () => {
                    item.classList.toggle('active');
                    if (item.classList.contains('active')) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    } else {
                        answer.style.maxHeight = '0';
                    }
                });
                question.dataset.listenerAdded = true; // リスナーが追加されたことをマーク
            }

            // 初期状態を閉じる
            item.classList.remove('active');
            answer.style.maxHeight = '0';
        });
    };

    // ページロード時に実行
    setupFaqToggle();

    // 「その他」自由記入フォーム表示制御
    const otherCheckbox = document.querySelector('input[name="source[]"][value="other"]');
    const otherSourceField = document.getElementById('other-source-field');

    if (otherCheckbox && otherSourceField) {
        otherCheckbox.addEventListener('change', () => {
            if (otherCheckbox.checked) {
                otherSourceField.style.display = 'block';
                otherSourceField.querySelector('input').focus(); // フォーカスを当てる
            } else {
                otherSourceField.style.display = 'none';
                otherSourceField.querySelector('input').value = ''; // 入力内容をクリア
            }
        });
    }

    // 同意チェックボックスと送信ボタンの活性化制御
    const agreeCheckbox = document.getElementById('agree_terms');
    const submitButton = document.querySelector('.btn-submit');

    if (agreeCheckbox && submitButton) {
        // ページロード時の初期状態を設定
        submitButton.disabled = !agreeCheckbox.checked;

        // チェックボックスの状態が変更されたときにボタンの状態を更新
        agreeCheckbox.addEventListener('change', () => {
            submitButton.disabled = !agreeCheckbox.checked;
        });
    }
});