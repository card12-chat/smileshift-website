/**
 * SmileShift FAQ Accordion Dynamics
 */
function toggleFaq(index) {
    const parentItem = document.getElementById(`faq-item-${index}`);
    const content = document.getElementById(`faq-content-${index}`);
    const iconWrapper = document.getElementById(`faq-icon-${index}`);

    if (parentItem && content && iconWrapper) {
        if (content.style.height && content.style.height !== '0px') {
            content.style.height = '0px';
            iconWrapper.style.transform = 'rotate(0deg)';
            iconWrapper.classList.remove('bg-smile-purple-main', 'text-white');
            iconWrapper.classList.add('bg-stone-100', 'text-smile-purple-main');
            parentItem.classList.remove('border-smile-purple-main/40', 'shadow-md');
            parentItem.classList.add('border-stone-200');
        } else {
            content.style.height = content.scrollHeight + 'px';
            iconWrapper.style.transform = 'rotate(45deg)';
            iconWrapper.classList.remove('bg-stone-100', 'text-smile-purple-main');
            iconWrapper.classList.add('bg-smile-purple-main', 'text-white');
            parentItem.classList.remove('border-stone-200');
            parentItem.classList.add('border-smile-purple-main/40', 'shadow-md');
        }
    }
}
