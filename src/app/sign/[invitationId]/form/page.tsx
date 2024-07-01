"use client";
import React from 'react'
import { ModalContext } from "@/contexts/ModalContext";
import { useSignatureMutation } from "@/lib/services/registersApi";
import { useRouter } from "next/navigation";
import PasswordStrengthBar from './PasswordStrengthBar';
import FloatingDecoration from '@/components/FloatingDecoration';
import Image from 'next/image';
import PlusDecoration from '@/components/PlusDecoration';
import Footer from '@/components/Footer';

function SignForm({ params }: { params: { invitationId: string } }) {

    const [password, setPassword] = React.useState('');
    const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
    const [passwordStrength, setPasswordStrength] = React.useState('débil');
    const [signature, { isLoading, error }] = useSignatureMutation();

    const { openModal } = React.useContext(ModalContext);

    const router = useRouter();

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (newPassword.length < 8) {
            setPasswordStrength('débil');
        } else if (!newPassword.match(/[A-Z]/)) {
            setPasswordStrength('débil');
        } else if (!newPassword.match(/[0-9]/)) {
            setPasswordStrength('regular');
        } else if (!newPassword.match(/[^A-Za-z0-9]/)) {
            setPasswordStrength('regular');
        } else {
            setPasswordStrength('fuerte');
        }
    };

    const handlePassword = () => {
        if (password !== passwordConfirmation) {
            if (!password || !passwordConfirmation) {
                return;
            }

            openModal(
                <div className="bg-white">
                    <FloatingDecoration
                        className={`w-48 md:w-64 absolute top-[0%] left-[20%] md:left-[25%]`}
                        img="/img/modal-eclipse-orange-1.svg"
                    />

                    <FloatingDecoration
                        className={`w-4 md:w-8 absolute top-[10%] left-[10%]`}
                        img="/img/red-plus.svg"
                    />


                    <div className="flex flex-col items-center justify-center h-[470px] w-auto md:w-[500px]">
                        <p className={`text-center text-xl p-4 text-black ajuste_centro`}>
                            Las contraseñas no coinciden.
                        </p>
                    </div>
                    <FloatingDecoration
                        className={`w-8 md:w-12 absolute bottom-[15%] right-[10%]`}
                        img="/img/red-plus.svg"
                    />

                    <FloatingDecoration
                        className={`w-36 md:w-44 absolute bottom-[0%] left-[0%]`}
                        img="/img/modal-eclipse-orange-2.svg"
                        customClass="rounded-bl-2xl"
                    />
                </div>,
            );

            return;
        }

        if (password.length < 8) {
            openModal(
                <div className="bg-white">
                    <FloatingDecoration
                        className={`w-48 md:w-64 absolute top-[0%] left-[20%] md:left-[25%]`}
                        img="/img/modal-eclipse-orange-1.svg"
                    />

                    <FloatingDecoration
                        className={`w-4 md:w-8 absolute top-[10%] left-[10%]`}
                        img="/img/red-plus.svg"
                    />


                    <div className="flex flex-col items-center justify-center h-[470px] w-auto md:w-[500px]">
                        <p className={`text-center text-xl p-4 text-black ajuste_centro`}>
                            La contraseña debe tener al menos 8 caracteres.
                        </p>
                    </div>
                    <FloatingDecoration
                        className={`w-8 md:w-12 absolute bottom-[15%] right-[10%]`}
                        img="/img/red-plus.svg"
                    />

                    <FloatingDecoration
                        className={`w-36 md:w-44 absolute bottom-[0%] left-[0%]`}
                        img="/img/modal-eclipse-orange-2.svg"
                        customClass="rounded-bl-2xl"
                    />
                </div>,
            );

            return;
        }

        if (!password.match(/[A-Z]/)) {
            openModal(
                <div className="bg-white">
                    <FloatingDecoration
                        className={`w-48 md:w-64 absolute top-[0%] left-[20%] md:left-[25%]`}
                        img="/img/modal-eclipse-orange-1.svg"
                    />

                    <FloatingDecoration
                        className={`w-4 md:w-8 absolute top-[10%] left-[10%]`}
                        img="/img/red-plus.svg"
                    />


                    <div className="flex flex-col items-center justify-center h-[470px] w-auto md:w-[500px]">
                        <p className={`text-center text-xl p-4 text-black ajuste_centro`}>
                            La contraseña debe tener al menos una mayúscula.
                        </p>
                    </div>
                    <FloatingDecoration
                        className={`w-8 md:w-12 absolute bottom-[15%] right-[10%]`}
                        img="/img/red-plus.svg"
                    />

                    <FloatingDecoration
                        className={`w-36 md:w-44 absolute bottom-[0%] left-[0%]`}
                        img="/img/modal-eclipse-orange-2.svg"
                        customClass="rounded-bl-2xl"
                    />
                </div>,
            );

            return;
        }

        if (!password.match(/[0-9]/)) {
            openModal(
                <div className="bg-white">
                    <FloatingDecoration
                        className={`w-48 md:w-64 absolute top-[0%] left-[20%] md:left-[25%]`}
                        img="/img/modal-eclipse-orange-1.svg"
                    />

                    <FloatingDecoration
                        className={`w-4 md:w-8 absolute top-[10%] left-[10%]`}
                        img="/img/red-plus.svg"
                    />


                    <div className="flex flex-col items-center justify-center h-[470px] w-auto md:w-[500px]">
                        <p className={`text-center text-xl p-4 text-black ajuste_centro`}>
                            La contraseña debe tener al menos un número.
                        </p>
                    </div>
                    <FloatingDecoration
                        className={`w-8 md:w-12 absolute bottom-[15%] right-[10%]`}
                        img="/img/red-plus.svg"
                    />

                    <FloatingDecoration
                        className={`w-36 md:w-44 absolute bottom-[0%] left-[0%]`}
                        img="/img/modal-eclipse-orange-2.svg"
                        customClass="rounded-bl-2xl"
                    />
                </div>,
            );

            return;
        }

        if (!password.match(/[^A-Za-z0-9]/)) {
            openModal(
                <div className="bg-white">
                    <FloatingDecoration
                        className={`w-48 md:w-64 absolute top-[0%] left-[20%] md:left-[25%]`}
                        img="/img/modal-eclipse-orange-1.svg"
                    />

                    <FloatingDecoration
                        className={`w-4 md:w-8 absolute top-[10%] left-[10%]`}
                        img="/img/red-plus.svg"
                    />


                    <div className="flex flex-col items-center justify-center h-[470px] w-auto md:w-[500px]">
                        <p className={`text-center text-xl p-4 text-black ajuste_centro`}>
                            La contraseña debe tener al menos un carácter especial.
                        </p>
                    </div>
                    <FloatingDecoration
                        className={`w-8 md:w-12 absolute bottom-[15%] right-[10%]`}
                        img="/img/red-plus.svg"
                    />

                    <FloatingDecoration
                        className={`w-36 md:w-44 absolute bottom-[0%] left-[0%]`}
                        img="/img/modal-eclipse-orange-2.svg"
                        customClass="rounded-bl-2xl"
                    />
                </div>,
            );

            return;
        }
    }
    const handleSubmit = () => {
        handlePassword();

        signature({
            invitation_id: parseInt(params.invitationId),
            new_password: password,
            new_password_confirmation: passwordConfirmation,
        })
            .unwrap()
            .then(() => {
                // Redirect to inphonity.com
                router.push(`/welcome/${params.invitationId}`);
            })
            .catch((response) => {
                if (response.data && response.data.message && response.data.message === 'Ya has firmado el contrato.') {
                    router.push(`/welcome/${params.invitationId}`);

                    return;

                }

                openModal(
                    <div className="bg-white">
                        <FloatingDecoration
                            className={`w-48 md:w-64 absolute top-[0%] left-[20%] md:left-[25%]`}
                            img="/img/modal-eclipse-orange-1.svg"
                        />

                        <FloatingDecoration
                            className={`w-4 md:w-8 absolute top-[10%] left-[10%]`}
                            img="/img/red-plus.svg"
                        />

                        <div className="flex flex-col items-center justify-center h-[470px] w-auto md:w-[500px]">
                            <p className={`text-center text-xl p-4 text-black ajuste_centro`}>
                                Ocurrió un error al firmar el contrato.
                            </p>
                        </div>
                        <FloatingDecoration
                            className={`w-8 md:w-12 absolute bottom-[15%] right-[10%]`}
                            img="/img/red-plus.svg"
                        />

                        <FloatingDecoration
                            className={`w-36 md:w-44 absolute bottom-[0%] left-[0%]`}
                            img="/img/modal-eclipse-orange-2.svg"
                            customClass="rounded-bl-2xl"
                        />
                    </div>,
                );
            });
    }
    return (
        <>
            <main className={`text-center bg-white text-black`} style={{ height: 'auto' }}>
                <FloatingDecoration
                    className={`w-24 md:w-40 lg:w-48 absolute top-[0%] right-[0%]`}
                    img="/img/sign-eclipse-green-1.svg"
                />
                <div className={`p-9 lg:w-3/4 mx-auto`}>
                    <Image
                        src="/Logo3.svg"
                        alt="Logotipo de Inphonity"
                        width={203}
                        height={29.4}
                        priority
                        className={`mx-auto`}
                    />
                </div>
                <div className={`container p-3 md:p-6 lg:p-12 py-3 mx-auto md:w-3/4 lg:w-4/5`}>
                    <h1 className={`text-3xl md:text-5xl font-bold font-medium mb-2 md:mb-3 lg:mb-4 text-center`}>
                        Crea una <span className="text-highlight">contraseña</span>
                    </h1>
                    <p className={`text-light text-lg md:text-xl mb-6 md:mb-10 lg:mb-14 text-center`}>
                        La necesitarás para ingresar a la App de inphonity
                    </p>
                    <p className={`text-light text-base md:text-lg mb-6 md:mb-10 lg:mb-14 text-center`}>
                        <strong className={`text-medium text-highlight`}>Importante:</strong>
                        <br />
                        Tu contraseña debe tener al menos 8 caracteres,
                        <br />
                        ser alfanumérica, incluir una mayúscula y un carácter
                        especial
                    </p>

                    <div className={`w-full md:w-3/4 mx-auto mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14`}>
                        <div className="flex items-center text-black mb-6 md:mb-8 lg:mb-10">
                            <input
                                type="email"
                                className={`input input-border-gray form-input h-12 w-full`}
                                placeholder="Correo electrónico"
                                name={'email'}
                                autoComplete="off"
                            />
                        </div>
                        <div className="flex items-center text-black mb-6 md:mb-8 lg:mb-10">
                            <input
                                type="password"
                                id="password"
                                className="input input-border-gray form-input h-12 w-full"
                                name={'password'}
                                placeholder={'Contraseña'}
                                onChange={handlePasswordChange}
                                onBlur={handlePassword}
                            />
                        </div>
                        <div className="flex items-center text-black mb-6 md:mb-8 lg:mb-10">
                            <input
                                type="password"
                                id="passwordConfirmation"
                                className="input input-border-gray h-12 w-full"
                                name={'passwordConfirmation'}
                                placeholder={'Confirmar contraseña'}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                onBlur={handlePassword}
                            />
                        </div>

                        <div className="flex items-center justify-center text-black mb-20">
                            <div className="w-1/2">
                                <PasswordStrengthBar strength={passwordStrength} />
                            </div>
                        </div>
                        <div className="flex items-center py-10 pb-14 justify-center">
                            <button
                                className="btn-xl multi-border bg-black text-white font-medium disabled:opacity-50"
                                onClick={handleSubmit}
                                disabled={isLoading}
                            >
                                ENVIAR
                            </button>
                        </div>
                    </div>
                </div>
                <FloatingDecoration
                    className={`w-12 md:w-24 lg:w-32 absolute bottom-[20%] md:bottom-[35%] lg:bottom-[15%] left-[0%]`}
                    img="/img/sign-eclipse-green-2.svg"
                />

                <FloatingDecoration
                    className={`w-12 md:w-32 lg:w-48 absolute bottom-[20%] md:bottom-[35%] lg:bottom-[15%] right-[5%] md:right-[3%]`}
                    img="/img/sign-eclipse-green-3.svg"
                />

                <PlusDecoration
                    className="hidden md:block w-8 absolute bottom-[75%] left-[10%]"
                    isGreen={true}
                />

                <FloatingDecoration
                    className={`w-4 md:w-6 lg:w-8 absolute bottom-[5%] md:bottom-[20%] lg:bottom-[5%] right-[5%] md:right-[22%] lg:right-[25%]`}
                    img="/img/blue-plus.svg"
                />
            </main>
            <Footer />
        </>
    )
}

export default SignForm;

