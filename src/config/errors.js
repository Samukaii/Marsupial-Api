const errors = {
    notProvideds: {
        tokenNotProvided: {
            error: {
                message: "Token não fornecido",
                code: "NOTPROVIDED_TOKEN"
            }
        },
        nameNotProvided: {
            error: {
                message: "Nome não fornecido",
                code: "NOTPROVIDED_NAME"
            }
        },
        emailNotProvided: {
            error: {
                message: "Email não fornecido",
                code: "NOTPROVIDED_EMAIL"
            }
        },
        passwordNotProvided: {
            error: {
                message: "Senha não fornecida",
                code: "NOTPROVIDED_PASSWORD"
            }
        },
        titleNotProvided: {
            error: {
                message: "Título não fornecido",
                code: "NOTPROVIDED_TITLE"
            }
        },
        sectionNotProvided: {
            error: {
                message: "Seção não fornecida",
                code: "NOTPROVIDED_SECTION"
            }
        },
        subjectNotProvided: {
            error: {
                message: "Matéria não fornecida",
                code: "NOTPROVIDED_SUBJECT"
            }
        },
        lessonNotProvided: {
            error: {
                message: "Aula não fornecida",
                code: "NOTPROVIDED_LESSON"
            }
        },
        linkNotProvided: {
            error: {
                message: "Link não fornecido",
                code: "NOTPROVIDED_LINK"
            }
        }
    },
    midlewareErrors: {
        invalidToken: {
            error: {
                message: "Token inválido",
                code: "MIDLEWAREERRORS_INVALIDTOKEN"
            }
        }
    },
    unknownErrors: {
        unknownLoginErrorCode: "UNKNOWN_LOGINERROR",
        unknownRegisterErrorCode: "UNKNOWN_REGISTERERROR",
        unknownCreateSectionErrorCode: "UNKNOWN_SECTIONERROR",
        unknownCreateLessonErrorCode: "UNKNOWN_LESSONERROR",
        unknownCreateVideoErrorCode: "UNKNOWN_VIDEOERROR"
    },
    commonErrors: {
        notAllFieldsProvided: {
            error: {
                message: "Nem todos os campos obrigatórios foram fornecidos",
                code: "C0"
            }
        }
    },
    loginErrors: {
        nonExistentEmail: {
            error: {
                message: "Email não cadastrado",
                code: "L0GINERROR_NONEXISTENTEMAIL"
            }
        },
        IncorrectPassword: {
            error: {
                message: "Senha incorreta",
                code: "L0GINERROR_INCORRECTPASSWORD"
            }
        }
    },
    registerErrors: {
        alreadyRegisteredUser: {
            error: {
                message: "Usuário já cadastrado",
                code: "REGISTERERROR_ALREADYREGISTEREDUSER"
            }
        }
    },

    sectionErrors: {
        invalidSubject: {
            error: {
                message: "A matéria fornecida é inválida",
                code: "SECTIONERROR_INVALIDSUBJECT"
            }
        }
    }
};

module.exports = errors;
