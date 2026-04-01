import User from '../model/User.js';
import UserRole from '../model/UserRole.js';
import Profile from '../model/Profile.js';
import defaultAdmin from '../config/defaultAdmin.js';

export default async function seedAdmin() {
  try {
    const existing = await User.findOne({ where: { email: defaultAdmin.email } });
    if (existing) {
      console.log(`Usuário admin já existe (id=${existing.id}). Nenhuma ação feita.`);
      return;
    }

    const user = await User.create({
      email: defaultAdmin.email,
      fullName: defaultAdmin.fullName,
      phone: defaultAdmin.phone,
      password: defaultAdmin.password,
      status: defaultAdmin.status,
    });

    await UserRole.create({
      userId: user.id,
      role: defaultAdmin.role,
    });

    await Profile.create({
      userId: user.id,
      ...defaultAdmin.profile,
    });

    console.log('Usuário ADMIN criado com sucesso!');
    console.log('Email:', defaultAdmin.email);
    console.log('Senha:', defaultAdmin.password);
  } catch (err) {
    console.error('Falha ao criar admin:', err);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

