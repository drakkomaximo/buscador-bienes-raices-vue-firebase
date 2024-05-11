import { ref, computed, onMounted } from 'vue'
import { defineStore } from "pinia";
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter} from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
    const auth = useFirebaseAuth();
    const errorMsg = ref('')
    const authUser = ref(null)
    const router = useRouter()
    const errorCodes = {
        'auth/invalid-email': 'El email no es valido',
        'auth/user-not-found': 'El usuario no existe',
        'auth/wrong-password': 'La contraseña es incorrecta',
        'auth/email-already-in-use': 'El email ya esta en uso',
        'auth/invalid-credential': 'Las credenciales no son validas',
    }

    onMounted(() => {
        onAuthStateChanged(auth, (user) => {
          if(user){
            authUser.value = user
          }
        })
    })

    const login = ({email, password}) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredencials) => {
          errorMsg.value = ''
          const user = userCredencials.user
          authUser.value = user
          router.push({name: 'admin-propiedades'})
        })
        .catch(error => {
          errorMsg.value = errorCodes[error.code]
        })
    }

    const logout = () => {
        signOut(auth)
        .then(() => {
          authUser.value = null
          router.push({name: 'login'})
        })
        .catch(error => {
          console.error(error)
        })
    }

    const hasError = computed(() => errorMsg.value)

    const isAuth = computed(() => authUser.value)
    return {
        login,
        logout,
        hasError,
        errorMsg,
        isAuth
    }
})