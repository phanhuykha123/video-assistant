export const filterChatbotDataByLang = (chatbotData, lang) => {
  const filterData = chatbotData.map((item) => {
    return {
      ...item,
      language: item.language?.find((item) => item.lang === lang)
    };
  });

  return filterData;
};
