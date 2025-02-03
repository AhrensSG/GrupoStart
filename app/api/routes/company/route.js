import { Company, User } from "@/db/models/models";

export async function POST(req) {
    try {
        const data = await req.json();
        const existingEmailCompany = await Company.findOne({
            where: {
                email: data.email,
            },
        });
        if (existingEmailCompany) {
            return Response.json("Company with this email already exists", { status: 400 });
        }
        const company = await Company.create(data);
        return Response.json(company);
    } catch (error) {
        return Response.json(error.message, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const data = await req.json();
        const company = await Company.findByPk(data.id);
        const user = await User.findByPk(data.UserId);
        if (!company) {
            return Response.json("Company not found", { status: 404 });
        }
        if (!user) {
            return Response.json("User not found", { status: 404 });
        }
        if (company.UserId !== user.id) {
            return Response.json("Unauthorized", { status: 401 });
        }
        await company.update(data);
        return Response.json(company);
    } catch (error) {
        return Response.json(error.message, { status: 500 });
    }
}
