import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { defineStore } from "pinia";
import { getUserInfo, registerUser } from "~/shared/apis/backend/auth";
import { UserEntity } from "~/shared/domain/user.entity";

initializeApp(JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG));
const firebaseAuth = getAuth();
await firebaseAuth.authStateReady();

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const userStore = ref<UserEntity | null>(null);
  const isAuthenticated = ref(false);

  firebaseAuth.onIdTokenChanged(async (fbuser) => {
    if (!fbuser) {
      clear();
      return;
    }

    isAuthenticated.value = true;
    userStore.value = await getUserInfo(await fbuser.getIdToken());
  });

  const clear = () => {
    isAuthenticated.value = false;
    userStore.value = null;
  };

  const logout = async () => {
    await firebaseAuth.signOut();
    clear();
    router.push("/login");
  };

  const getToken = async () => {
    const user = firebaseAuth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      return token;
    }
    return;
  };

  const getUser = async () => {
    const user = await getUserInfo(await getToken());
    userStore.value = user;
    return user;
  };

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(
      firebaseAuth,
      new GoogleAuthProvider()
    );
    const user = await registerUser(await result.user.getIdToken());
    userStore.value = user;
    router.push("/");
  };

  return {
    isAuthenticated,
    user: userStore,
    logout,
    getToken,
    getUser,
    loginWithGoogle,
  };
});
