import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

const start = async () => {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Advanced Backend')
        .setDescription('Documentation for API')
        .setVersion('0.0.3')
        .addTag('Nest.JS Start')
        .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(PORT, () => console.log(`port: ${PORT}`));
};

start();