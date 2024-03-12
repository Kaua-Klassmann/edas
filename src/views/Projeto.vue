<template>
  <main v-once>
    <div class="bg-light rounded-3">
      <h1 class="text-center py-4">Projeto</h1>
      <p class="px-4 text-black">
        <span class="mx-3"></span>A EDAS (Sistema de Agendamento Educacional) é
        uma plataforma desenvolvida pelo aluno Kauã da Cruz Klassmann, sob a
        orientação e supervisão do professor conselheiro Moser Fagundes.<br />
        <span class="mx-3"></span>A principal característica da EDAS é a sua
        capacidade de centralizar todas as informações relacionadas às
        atividades escolares dos alunos em um único local. Os estudantes podem
        acessar a plataforma para visualizar seus horários, datas de provas,
        prazos de trabalhos e outras tarefas importantes.<br />
        <span class="mx-3"></span>A plataforma também promove a colaboração
        entre os alunos. Os estudantes podem compartilhar informações sobre
        provas, trabalhos e recursos de estudo, permitindo uma comunidade de
        apoio mútuo. Essa interação entre os alunos contribui para um ambiente
        acadêmico mais colaborativo e solidário.<br />
        <span class="mx-3"></span>Em resumo, a EDAS é uma ferramenta essencial
        para a gestão acadêmica dos alunos. Com a capacidade de centralizar
        informações e incentivar a colaboração, ela ajuda a tornar a vida
        escolar mais organizada e menos estressante, permitindo que os alunos
        melhorem seu desempenho.
      </p>
      <h6 class="py-4 px-4 text-center">
        Email de suporte: edas.contact@gmail.com
      </h6>
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: 93vh;
  display: grid;
  place-items: center;
}

main > div {
  width: 80vw;
}

div > p {
  text-align: justify;
  padding-bottom: 20px;
}

@media (max-width: 600px) {
  main > div {
    margin: 40px 0;
    width: 99vw;
  }
}
</style>
