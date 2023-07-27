import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Error from '../Components/Error';
import { Form, useActionData, useSubmit } from 'react-router-dom';

// Ce composant représente la vue de connexion de l'administrateur. Il permet à l'administrateur de se connecter en saisissant son adresse e-mail et son mot de passe.
const LoginView = () => {
    // méthode de soumission du formulaire
    let submit = useSubmit();
    
    let errorMessage = useActionData();
    const [error, seterror] = useState(false);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        // effacer le message d'erreur après 5 secondes
        if (errorMessage) {
            seterror(true)
            setloading(false)
            setTimeout(() => {
                seterror(false)
            },5000)
        }
    }, [errorMessage]);

    

    return (

        <div className="container mx-auto p-5 mt-24 relative flex flex-col  items-center">
            <AnimatePresence >
                {
                    error && (
                        <Error message={errorMessage} postion={['top-0', 'right-0']} AlertWidth={['w-80']} />
                    )
                }
            </AnimatePresence>
            {/* title */}
            <h1 className='text-2xl text-white w-96 text-center'>Connectez-vous à l'espace administrateur</h1>
            {/* email */}
            <Form method='POST' onSubmit={
                () => {
                    setloading(true);
                    submit()
                }
            }>
                <div className="form-control my-10 w-96">
                    <label className="label">
                        <span className="label-text">Votre adresse email</span>

                    </label>
                    <input type="email" required name='email' placeholder="exemple@gmail.com" className="input rounded-none w-full " />
                    {/*  </label> */}
                </div>
                {/* password */}
                <div className="form-control my-10 w-96">
                    <label className="label">
                        <span className="label-text">Votre mot de passe</span>

                    </label>
                    <input type="password" required name='password' placeholder="Mot de passe" className="input rounded-none  w-full " />
                    {/*   </label> */}
                </div>
                {/* submit */}
                <div className='w-96 flex justify-center'>
                    {
                        loading ? <span className="loading loading-spinner"></span> :
                            <button type="submit" className="btn rounded-none mx-auto bg-white text-base-100 hover:bg-white hover:scale-90">
                                Connexion
                            </button>
                    }

                </div>
            </Form >
        </div>

    );
}

export default LoginView;
