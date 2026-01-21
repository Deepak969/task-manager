import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";

const createUsers = async () => {
    const users = [  
        {
            name: "User Two",
            email: "user2@gmail.com",
            password: "User@123",
            role: "user",
            mobile: "7777777777",
        },
    ];

    try {
        for (const user of users) {
            const res = await createUserWithEmailAndPassword(
                auth,
                user.email,
                user.password
            );

            await setDoc(doc(db, "users", res.user.uid), {
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                role: user.role,
                createdAt: serverTimestamp(),
            });
        }

        alert("Users created successfully");
    } catch (error) {
        console.error("User creation error:", error.message);
        alert(error.message);
    }

};

export default createUsers;
