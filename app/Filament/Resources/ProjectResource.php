<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Filament\Resources\ProjectResource\RelationManagers;
use App\Models\Category;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use LucasGiovanny\FilamentMultiselectTwoSides\Forms\Components\Fields\MultiselectTwoSides;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;
    protected static ?int $navigationSort = 1;
    protected static ?string $navigationIcon = 'heroicon-o-folder';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->required(),
                Forms\Components\TextInput::make('github')
                    ->url()
                    ->nullable(),
                Forms\Components\FileUpload::make('image')
                    ->image(),
                Forms\Components\CheckboxList::make('categories')
                    ->relationship(titleAttribute: 'name')
                    ->columns(6)
                    ->searchable()
                    ->required(),
            ])->columns([
                'sm' => 1,
                'xl' => 1,
                '2xl' => 1,
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('categories.name'),
                Tables\Columns\ImageColumn::make('image'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->relationship('categories', 'name')
                    ->searchable()
                    ->preload(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
        ];
    }
}
