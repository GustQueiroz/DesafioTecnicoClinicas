/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-misused-promises */

import {
  PrismaClient,
  Clinic,
  Professional,
  Schedule,
  Patient,
  Appointment,
} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Limpar o banco de dados antes de inserir novos registros
  await prisma.appointment.deleteMany({});
  await prisma.schedule.deleteMany({});
  await prisma.professional.deleteMany({});
  await prisma.clinic.deleteMany({});
  await prisma.patient.deleteMany({});

  console.log('Banco de dados limpo');

  // Lista de especialidades médicas
  const specialties = [
    'Cardiologia',
    'Dermatologia',
    'Neurologia',
    'Ortopedia',
    'Oftalmologia',
    'Ginecologia',
    'Pediatria',
    'Psiquiatria',
    'Endocrinologia',
    'Urologia',
    'Otorrinolaringologia',
    'Gastroenterologia',
    'Oncologia',
    'Reumatologia',
    'Infectologia',
    'Anestesiologia',
    'Cirurgia Plástica',
    'Cirurgia Geral',
    'Geriatria',
    'Medicina Esportiva',
  ];

  // Clínicas
  const clinics = [
    { name: 'Clínica Central', location: 'Avenida Paulista, 1000, São Paulo' },
    {
      name: 'Instituto Médico Avançado',
      location: 'Rua Oscar Freire, 500, São Paulo',
    },
    {
      name: 'Centro Médico Especializado',
      location: 'Avenida Brasil, 2000, Rio de Janeiro',
    },
    {
      name: 'Policlínica Integrada',
      location: 'Avenida Beira Mar, 1500, Florianópolis',
    },
  ];

  // Criando as clínicas
  const createdClinics: Clinic[] = [];
  for (const clinicData of clinics) {
    const clinic = await prisma.clinic.create({
      data: clinicData,
    });
    console.log(`Clínica criada: ${clinic.name}`);
    createdClinics.push(clinic);
  }

  // Criando médicos para cada clínica
  const firstNames = [
    'Ana',
    'Carlos',
    'Maria',
    'João',
    'Juliana',
    'Pedro',
    'Fernanda',
    'Rafael',
    'Patrícia',
    'Marcos',
    'Camila',
    'Lucas',
    'Carolina',
    'Eduardo',
    'Beatriz',
    'Ricardo',
    'Amanda',
    'Gustavo',
    'Larissa',
    'Felipe',
  ];

  const lastNames = [
    'Silva',
    'Santos',
    'Oliveira',
    'Souza',
    'Costa',
    'Pereira',
    'Almeida',
    'Ferreira',
    'Ribeiro',
    'Rodrigues',
    'Gomes',
    'Lima',
    'Carvalho',
    'Martins',
    'Araújo',
    'Nascimento',
    'Moreira',
    'Barbosa',
    'Mendes',
    'Cavalcanti',
  ];

  const professionals: Professional[] = [];

  for (const clinic of createdClinics) {
    // Definindo quantos médicos cada clínica terá (entre 8 e 12)
    const numDoctors = Math.floor(Math.random() * 5) + 8;

    for (let i = 0; i < numDoctors; i++) {
      // Selecionando nomes aleatórios
      const firstName =
        firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const fullName = `Dr(a). ${firstName} ${lastName}`;

      // Selecionando especialidade aleatória
      const specialty =
        specialties[Math.floor(Math.random() * specialties.length)];

      const professional = await prisma.professional.create({
        data: {
          name: fullName,
          specialty,
          clinicId: clinic.id,
        },
      });

      console.log(
        `Profissional criado: ${professional.name} - ${professional.specialty} (Clínica: ${clinic.name})`,
      );
      professionals.push(professional);
    }
  }

  // Criando agendas para os próximos 30 dias para cada profissional
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);

  // Horários disponíveis
  const timeSlots = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
  ];

  const schedules: Schedule[] = [];

  for (const professional of professionals) {
    // Para cada profissional, criar horários para os próximos 30 dias
    // exceto finais de semana
    for (let d = 0; d < 30; d++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + d);

      // Pular fins de semana (6 = sábado, 0 = domingo)
      if (currentDate.getDay() === 6 || currentDate.getDay() === 0) {
        continue;
      }

      // Cada médico terá entre 4 e 8 horários disponíveis por dia
      const numSlots = Math.floor(Math.random() * 5) + 4;
      const selectedTimeSlots = [...timeSlots]
        .sort(() => 0.5 - Math.random())
        .slice(0, numSlots);

      for (const time of selectedTimeSlots) {
        // Obter a clínica do profissional
        const clinic = await prisma.clinic.findUnique({
          where: { id: professional.clinicId },
        });

        if (!clinic) continue;

        // Criar o agendamento e conectar com a clínica
        const schedule = await prisma.schedule.create({
          data: {
            professionalId: professional.id,
            date: currentDate,
            time,
            Clinic: {
              connect: { id: clinic.id },
            },
          },
        });

        schedules.push(schedule);
      }
    }
  }

  console.log(`Criados ${schedules.length} horários para consultas`);

  // Criando alguns pacientes
  const patients: Patient[] = [];

  for (let i = 0; i < 50; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `${firstName} ${lastName}`;

    // Gerar CPF aleatório
    const generateCPF = () => {
      const random = (n: number) => Math.round(Math.random() * n);
      const n = Array(9)
        .fill('')
        .map(() => random(9));

      // Calcula primeiro dígito verificador
      let d1 =
        n.reduce((total, number, index) => total + number * (10 - index), 0) %
        11;
      d1 = d1 < 2 ? 0 : 11 - d1;

      // Calcula segundo dígito verificador
      const n2 = [...n, d1];
      let d2 =
        n2.reduce((total, number, index) => total + number * (11 - index), 0) %
        11;
      d2 = d2 < 2 ? 0 : 11 - d2;

      return [...n, d1, d2].join('');
    };

    const cpf = generateCPF();

    const patient = await prisma.patient.create({
      data: {
        name: fullName,
        cpf,
      },
    });

    patients.push(patient);
  }

  console.log(`Criados ${patients.length} pacientes`);

  // Criando alguns agendamentos
  const appointments: Appointment[] = [];
  const appointmentStatus = [
    'SCHEDULED',
    'CONFIRMED',
    'COMPLETED',
    'CANCELLED',
  ];

  // Criar 100 agendamentos aleatórios
  for (let i = 0; i < 100; i++) {
    // Selecionar um horário aleatório
    if (schedules.length === 0) break;
    const randomScheduleIndex = Math.floor(Math.random() * schedules.length);
    const schedule = schedules[randomScheduleIndex];

    // Selecionar um paciente aleatório
    const randomPatientIndex = Math.floor(Math.random() * patients.length);
    const patient = patients[randomPatientIndex];

    // Status aleatório
    const status =
      appointmentStatus[Math.floor(Math.random() * appointmentStatus.length)];

    try {
      const appointment = await prisma.appointment.create({
        data: {
          scheduleId: schedule.id,
          patientId: patient.id,
          date: schedule.date,
          status,
        },
      });

      appointments.push(appointment);

      // Remover o horário usado da lista para evitar duplicações
      schedules.splice(randomScheduleIndex, 1);
    } catch (error) {
      console.error(
        `Erro ao criar agendamento: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  console.log(`Criados ${appointments.length} agendamentos`);

  // Estatísticas
  const clinicsCount = await prisma.clinic.count();
  const professionalsCount = await prisma.professional.count();
  const schedulesCount = await prisma.schedule.count();
  const patientsCount = await prisma.patient.count();
  const appointmentsCount = await prisma.appointment.count();

  console.log('\n===== ESTATÍSTICAS DO BANCO DE DADOS =====');
  console.log(`Clínicas: ${clinicsCount}`);
  console.log(`Profissionais: ${professionalsCount}`);
  console.log(`Horários disponíveis: ${schedulesCount}`);
  console.log(`Pacientes: ${patientsCount}`);
  console.log(`Agendamentos: ${appointmentsCount}`);

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
